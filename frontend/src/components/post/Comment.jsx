import { Link } from "react-router-dom";
import { StyledComment } from "../../style/post/CommentCSS.js";
import moment from "moment";
import "moment/locale/ko";

function Comment({ commentId, uid, curUId, uName, content, createdAt }) {
    const setTime = (c) => {
        return moment(c).format("YYYY년 MMMM Do");
    };

    const handleNestedComment = (e) => {
        e.preventDefault();
    };

    const handleEditComment = (e) => {
        e.preventDefault();
    };

    const handleDeleteCommnet = (e) => {
        e.preventDefault();
    };

    return (
        <StyledComment>
            <div>
                <Link to={`/user/${uid}`}>{uName}</Link>
                <p>{setTime(createdAt)}</p>
                <div>
                    <button>답글</button>
                    {curUId === uid ? (
                        <>
                            <button>수정</button>
                            <button>삭제</button>
                        </>
                    ) : null}
                </div>
            </div>
            <p>{content}</p>
        </StyledComment>
    );
}

export default Comment;
