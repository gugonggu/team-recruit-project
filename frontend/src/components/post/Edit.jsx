import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Editor from "./Editor";

function Edit() {
    const params = useParams();
    const navigate = useNavigate();

    const [postInfo, setPostInfo] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const body = {
            _id: params.id,
        };
        axios
            .post("/api/post/getpostinfo", body)
            .then((res) => {
                if (res.data.success) {
                    setPostInfo(res.data.post);
                }
            })
            .catch((e) => console.log(e));
    }, []);

    useEffect(() => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
    }, [postInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === "" || content === "") {
            return alert("모든 항목을 채워주세요");
        }
        const body = {
            title: title,
            content: content,
            _id: params.id,
        };
        axios.post("/api/post/edit", body).then((res) => {
            if (res.data.success) {
                navigate(`/post/${params.id}`);
            } else {
                return alert("글 수정 과정에 오류가 발생했습니다.");
            }
        });
    };

    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="제목"
                    value={title || ""}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                ></input>
                <Editor content={content} setContent={setContent} />
                <button onClick={(e) => handleSubmit(e)}>수정</button>
            </form>
        </div>
    );
}

export default Edit;
