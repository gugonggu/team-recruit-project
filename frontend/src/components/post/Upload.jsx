import { useState } from "react";
import axios from "axios";
import Editor from "./Editor";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Upload() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === "" || content === "") {
            return alert("모든 항목을 채워주세요");
        }
        const body = {
            title: title,
            content: content,
            userId: user._id,
        };
        axios.post("/api/post/upload", body).then((res) => {
            if (res.data.success) {
                navigate(`/post/${res.data._id}`);
            } else {
                return alert("글을 작성하는데 오류가 발생했습니다." + e);
            }
        });
    };

    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                ></input>
                <Editor content={content} setContent={setContent} />
                <button onClick={(e) => handleSubmit(e)}>제출</button>
            </form>
        </div>
    );
}

export default Upload;
