import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { PostContainer } from "../../style/post/PostCSS.js";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

function Post() {
    const params = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const [postInfo, setPostInfo] = useState({});

    useEffect(() => {
        const body = {
            _id: params.id,
            uid: user._id,
        };
        axios.post("/api/post/getpostinfo", body).then((res) => {
            if (res.data.success) {
                setPostInfo(res.data.post);
            } else {
                navigate("/404");
            }
        });
    }, []);

    useEffect(() => {
        console.log(postInfo);
    }, [postInfo]);

    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            const body = {
                _id: params.id,
                userId: postInfo.author,
            };
            axios
                .post("/api/post/delete", body)
                .then((res) => {
                    if (res.data.success) {
                        alert("게시글이 성공적으로 삭제되었습니다.");
                        navigate("/");
                    } else {
                        alert("게시글 삭제에 실패했습니다.");
                    }
                })
                .catch((e) => alert("게시글 삭제에 실패했습니다."));
        }
    };

    return (
        <PostContainer>
            <div>
                <h1>{postInfo.title}</h1>
                <p>
                    {postInfo
                        ? postInfo.author && postInfo.author.name
                        : "로딩중"}
                </p>
                <p>{postInfo.createdAt}</p>
                <p>{postInfo.updatedAt}</p>
            </div>
            <div>
                <p>{postInfo.projectType}</p>
                <p>{postInfo.numOfRecruit}</p>
                <p>{postInfo.department}</p>
                <p>{postInfo.major}</p>
                <p>{postInfo.grade}</p>
                <p>{postInfo.end}</p>
            </div>
            <div>
                {postInfo.content ? parse(postInfo.content) : null}
                <p>
                    {postInfo ? postInfo.meta && postInfo.meta.views : "로딩중"}
                </p>
                <p>
                    {postInfo ? postInfo.meta && postInfo.meta.likes : "로딩중"}
                </p>
            </div>
            {postInfo && postInfo.author && postInfo.author._id === user._id ? (
                <>
                    <Link to={`/post/edit/${params.id}`}>수정</Link>
                    <button onClick={(e) => handleDelete(e)}>삭제</button>
                </>
            ) : null}
        </PostContainer>
    );
}

export default Post;
