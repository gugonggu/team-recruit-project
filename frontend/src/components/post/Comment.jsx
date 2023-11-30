import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    StyledComment,
    EditComent,
    AddNestedComment,
} from "../../style/post/CommentCSS.js";
import NestedComment from "./NestedComment.jsx";
import moment from "moment";
import "moment/locale/ko";

function Comment({
    postId,
    commentId,
    uid,
    curUId,
    uName,
    content,
    createdAt,
    nestedComments,
}) {
    const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
    const [openEditComment, setOpenEditComment] = useState(false);
    const [editComment, setEditComment] = useState(content);
    const [addNestedComment, setAddNestedComment] = useState("");
    const [openAddNestedComment, setOpenAddNestedComment] = useState(false);

    const setTime = (c) => {
        return moment(c).format("YYYY년 MMMM Do");
    };

    const handleEditComment = (e) => {
        e.preventDefault();
        const body = {
            cId: commentId,
            content: editComment,
        };
        axios
            .post(`${PROXY}/api/post/editcomment`, body)
            .then((res) => {
                if (res.data.success) {
                    window.location.reload();
                }
            })
            .catch((e) => console.log(e));
    };

    const handleDeleteCommnet = (e) => {
        e.preventDefault();
        if (window.confirm("댓글을 정말로 삭제하시겠습니까?")) {
            const body = {
                cId: commentId,
                pId: postId,
            };
            axios
                .post(`${PROXY}/api/post/deletecomment`, body)
                .then((res) => {
                    if (res.data.success) {
                        window.location.reload();
                    }
                })
                .catch((e) => console.log(e));
        }
    };

    const handleAddNestedComment = (e) => {
        e.preventDefault();
        const body = {
            cId: commentId,
            uid: curUId,
            content: addNestedComment,
        };
        axios
            .post(`${PROXY}/api/post/addnestedcomment`, body)
            .then((res) => {
                if (res.data.success) {
                    window.location.reload();
                }
            })
            .catch((e) => console.log(e));
    };

    return (
        <StyledComment>
            <div>
                <Link to={`/user/${uid}`}>{uName}</Link>
                <p>{setTime(createdAt)}</p>
                <div className="commentButtonContainer">
                    <button
                        onClick={() =>
                            setOpenAddNestedComment(!openAddNestedComment)
                        }
                    >
                        답글
                    </button>
                    {curUId === uid ? (
                        <>
                            <button
                                onClick={() =>
                                    setOpenEditComment(!openEditComment)
                                }
                            >
                                수정
                            </button>
                            <button onClick={(e) => handleDeleteCommnet(e)}>
                                삭제
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
            {openEditComment ? (
                <EditComent>
                    <input
                        type="text"
                        value={editComment}
                        onChange={(e) => setEditComment(e.currentTarget.value)}
                    ></input>
                    <button onClick={(e) => handleEditComment(e)}>수정</button>
                </EditComent>
            ) : (
                <p className="content">{content}</p>
            )}
            {openAddNestedComment ? (
                <AddNestedComment>
                    <input
                        type="text"
                        placeholder="추가할 답글을 입력해주세요 :)"
                        onChange={(e) =>
                            setAddNestedComment(e.currentTarget.value)
                        }
                    />
                    <button onClick={(e) => handleAddNestedComment(e)}>
                        등록
                    </button>
                </AddNestedComment>
            ) : null}
            {nestedComments
                ? nestedComments.map((v, i) => {
                      return (
                          <NestedComment
                              key={i}
                              uid={v.author._id}
                              curUId={curUId}
                              cid={v._id}
                              parentCId={commentId}
                              content={v.content}
                              author={v.author.name}
                              cTime={setTime(v.createdAt)}
                          />
                      );
                  })
                : null}
        </StyledComment>
    );
}

export default Comment;
