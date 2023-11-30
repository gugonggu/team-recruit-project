import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import parse from "html-react-parser";
import { MyPageContainer } from "../../style/user/MyPageCSS.js";

function MyPage() {
    const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
    const params = useParams();
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const [dbUser, setDbUser] = useState({});

    useEffect(() => {
        const body = {
            _id: params.id,
        };
        axios.post(`${PROXY}/api/user/getuserinfo`, body).then((res) => {
            if (res.data.success) {
                setDbUser(res.data.user);
            }
        });
    }, []);

    return (
        <MyPageContainer>
            <section>
                <h2>회원 정보</h2>
                <div className="userInfo">
                    <div>
                        <p>이름 : {dbUser.name}</p>
                        <p>이메일 : {dbUser.email}</p>
                    </div>
                    <div>
                        <p>소속 학부 : {dbUser.department}</p>
                        <p>전공 : {dbUser.major}</p>
                        <p>학년 : {dbUser.grade}학년</p>
                    </div>
                </div>
            </section>
            <section>
                <h2>자기소개</h2>
                {dbUser.description ? (
                    parse(dbUser.description)
                ) : (
                    <p className="noDesc">아직 등록된 자기소개가 없습니다.</p>
                )}
            </section>
            {dbUser._id === user._id ? (
                <button onClick={() => navigate(`/user/edit/${dbUser._id}`)}>
                    정보 수정
                </button>
            ) : null}
        </MyPageContainer>
    );
}

export default MyPage;
