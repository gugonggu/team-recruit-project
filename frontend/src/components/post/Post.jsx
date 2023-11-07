import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
        };
        axios.post("/api/post/getpostinfo", body).then((res) => {
            if (res.data.success) {
                setPostInfo(res.data.post);
            } else {
                navigate("/404");
            }
        });
    }, []);

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
        <div>
            <h1>{postInfo.title}</h1>
            <div>{postInfo.content ? parse(postInfo.content) : null}</div>
            {postInfo.author === user._id ? (
                <>
                    <Link to={`/post/edit/${params.id}`}>수정</Link>
                    <button onClick={(e) => handleDelete(e)}>삭제</button>
                </>
            ) : null}
        </div>
    );
}

export default Post;
