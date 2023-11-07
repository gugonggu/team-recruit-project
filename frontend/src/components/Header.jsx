import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { HeaderDiv, StyledLink } from "../style/HeaderCSS.js";
import axios from "axios";
import { clearUser } from "../reducer/userSlice.js";

function Header() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        axios.post("/api/user/logout").then((res) => {
            if (res.data.success) {
                dispatch(clearUser());
            }
        });
    };

    return (
        <HeaderDiv>
            <StyledLink to="/">Header</StyledLink>
            <ul>
                <li>
                    <StyledLink to="/">홈</StyledLink>
                </li>
                {user.user.email ? (
                    <>
                        <li
                            onClick={() => {
                                logoutHandler();
                                navigate("/");
                            }}
                        >
                            로그아웃
                        </li>
                        {
                            <li>
                                <StyledLink to={`/user/${user.user._id}`}>
                                    마이 페이지
                                </StyledLink>
                            </li>
                        }
                    </>
                ) : (
                    <>
                        <li>
                            <StyledLink to="/login">로그인</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/signup">회원가입</StyledLink>
                        </li>
                    </>
                )}
                <li>
                    <StyledLink to="/upload">새 모집 글 작성</StyledLink>
                </li>
            </ul>
        </HeaderDiv>
    );
}

export default Header;
