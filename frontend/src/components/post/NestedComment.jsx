import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    StyledNestedComment,
    EditNestedComment,
} from "../../style/post/CommentCSS.js";

function NestedComment({
    uid,
    curUId,
    cid,
    parentCId,
    content,
    author,
    cTime,
}) {
    const [openEditComment, setOpenEditCommnet] = useState(false);
    const [editComment, setEditComment] = useState(content);

    const handleEdit = (e) => {
        e.preventDefault();
        const body = {
            cid: cid,
            content: editComment,
        };
        axios
            .post("/api/post/editnestedcomment", body)
            .then((res) => {
                if (res.data.success) {
                    window.location.reload();
                }
            })
            .catch((e) => console.log(e));
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm("답글을 정말로 삭제하시겠습니까?")) {
            const body = {
                cid: cid,
                parentCId: parentCId,
            };
            axios
                .post("/api/post/deletenestedcomment", body)
                .then((res) => {
                    if (res.data.success) {
                        window.location.reload();
                    }
                })
                .catch((e) => console.log(e));
        }
    };

    return (
        <StyledNestedComment>
            <div className="nestedCommentHeader">
                <div>
                    <Link className="nestedCommentAuthor" to={`/user/${uid}`}>
                        {author}
                    </Link>
                    <p>{cTime}</p>
                </div>
                {uid === curUId ? (
                    <div className="commentButtonContainer">
                        <button
                            onClick={() => setOpenEditCommnet(!openEditComment)}
                        >
                            수정
                        </button>
                        <button onClick={(e) => handleDelete(e)}>삭제</button>
                    </div>
                ) : null}
            </div>
            {openEditComment ? (
                <EditNestedComment>
                    <input
                        type="text"
                        value={editComment}
                        onChange={(e) => setEditComment(e.currentTarget.value)}
                    ></input>
                    <button onClick={(e) => handleEdit(e)}>답글 수정</button>
                </EditNestedComment>
            ) : (
                <p className="nestedCommentContent">{content}</p>
            )}
        </StyledNestedComment>
    );
}

export default NestedComment;
