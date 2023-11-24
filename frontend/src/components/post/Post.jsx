import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner.jsx";
import Comment from "./Comment.jsx";
import { PostContainer } from "../../style/post/PostCSS.js";
import { CommentContainer, NoComments } from "../../style/post/CommentCSS.js";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { FaRegEye, FaStar, FaRegStar } from "react-icons/fa6";

import moment from "moment";
import "moment/locale/ko";

function Post() {
    const params = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const [postInfo, setPostInfo] = useState({});
    const [postLikes, setPostLikes] = useState(0);
    const [userLike, setUserLike] = useState(false);
    const [loadingFlag, setLoadingFlag] = useState(false);
    const [comment, setComment] = useState("");

    const setTime = (c) => {
        return moment(c).format("YYYY년 MMMM Do");
    };

    useEffect(() => {
        const body = {
            _id: params.id,
            uid: user._id,
        };
        axios.post("/api/post/getpostinfo", body).then((res) => {
            if (res.data.success) {
                setPostInfo(res.data.post);
                setLoadingFlag(true);
                setPostLikes(res.data.post.meta.likes);
                if (res.data.userLike) {
                    setUserLike(res.data.userLike);
                }
            } else {
                navigate("/404");
            }
        });
    }, []);

    const handleLike = (e) => {
        if (!user._id) {
            return navigate("/signin");
        }
        e.preventDefault();
        const body = {
            _id: params.id,
            uid: user._id,
        };
        axios
            .post("/api/post/postlike", body)
            .then((res) => {
                if (res.data.success) {
                    setUserLike(!userLike);
                    if (res.data.info === "plus") {
                        setPostLikes(postLikes + 1);
                    } else {
                        setPostLikes(postLikes - 1);
                    }
                }
            })
            .catch((e) => console.log(e));
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        const body = {
            _id: params.id,
            uid: user._id,
            content: comment,
        };
        axios
            .post("/api/post/addcomment", body)
            .then((res) => {
                if (res.data.success) {
                    window.location.reload();
                }
            })
            .catch((e) => console.log(e));
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            const body = {
                _id: params.id,
                userId: user._id,
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
            {loadingFlag ? (
                <>
                    <div className="title">
                        <h1>{postInfo.title}</h1>
                        <Link to={`/user/${postInfo.author._id}`}>
                            작성자 :{" "}
                            {postInfo
                                ? postInfo.author && postInfo.author.name
                                : "로딩중"}
                        </Link>
                        <div>
                            <div>
                                <p>
                                    글 업로드 날짜 :{" "}
                                    {setTime(postInfo.createdAt)}
                                </p>
                            </div>
                            <div className="postMeta">
                                <FaRegEye />
                                <p>
                                    {postInfo
                                        ? postInfo.meta && postInfo.meta.views
                                        : "로딩중"}
                                </p>
                                {userLike ? (
                                    <FaStar
                                        className="star"
                                        onClick={(e) => handleLike(e)}
                                    />
                                ) : (
                                    <FaRegStar
                                        className="star"
                                        onClick={(e) => handleLike(e)}
                                    />
                                )}
                                <p>{postLikes}</p>
                            </div>
                        </div>
                        {postInfo.createdAt !== postInfo.updatedAt ? (
                            <p>글 수정 날짜 : {setTime(postInfo.updatedAt)}</p>
                        ) : null}
                    </div>
                    <div className="postInformation">
                        <h2>모집 기본 정보</h2>
                        <div className="postInfoRow">
                            <div className="postInfoEach">
                                <h4>프로젝트 타입</h4>
                                <p>{postInfo.projectType}</p>
                            </div>
                            <div className="postInfoEach">
                                <h4>모집 인원</h4>
                                <p>{postInfo.numOfRecruit}</p>
                            </div>
                        </div>
                        <div className="postInfoRow">
                            <div className="postInfoEach">
                                <h4>학부</h4>
                                <p>{postInfo.department}</p>
                            </div>
                            <div className="postInfoEach">
                                <h4>전공</h4>
                                <p>{postInfo.major}</p>
                            </div>
                        </div>
                        <div className="postInfoRow">
                            <div className="postInfoEach">
                                <h4>학년</h4>
                                <p>{postInfo.grade}</p>
                            </div>
                            <div className="postInfoEach">
                                <h4>모집 마감 날짜</h4>
                                <p>{setTime(postInfo.end)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="postContent">
                        <h2>모집 설명</h2>
                        {postInfo.content ? parse(postInfo.content) : null}
                    </div>
                    <div className="postComments">
                        <h4>댓글 {postInfo.comments.length}개</h4>
                        <div>
                            <input
                                type="text"
                                placeholder="추가할 댓글을 입력해주세요 :)"
                                value={comment}
                                onChange={(e) =>
                                    setComment(e.currentTarget.value)
                                }
                            />
                            <button
                                className="commentButton"
                                onClick={(e) => handleAddComment(e)}
                            >
                                댓글 등록
                            </button>
                        </div>
                        <CommentContainer>
                            {postInfo.comments.length !== 0 ? (
                                postInfo.comments.map((v, i) => {
                                    return (
                                        <Comment
                                            key={i}
                                            commentId={v._id}
                                            uid={v.author._id}
                                            curUId={user._id}
                                            uName={v.author.name}
                                            content={v.content}
                                            createdAt={v.createdAt}
                                        >
                                            {v.content}
                                        </Comment>
                                    );
                                })
                            ) : (
                                <NoComments>
                                    아직 댓글이 없습니다.
                                    <br />첫 댓글을 남겨보세요!
                                </NoComments>
                            )}
                        </CommentContainer>
                    </div>
                    <div className="postManage">
                        {postInfo.author._id === user._id ? (
                            <h2>모집 관리</h2>
                        ) : (
                            <h2>모집 신청</h2>
                        )}
                        <div className="buttonContainer">
                            {postInfo &&
                            postInfo.author &&
                            postInfo.author._id === user._id ? (
                                <>
                                    <Link to={`/post/edit/${params.id}`}>
                                        수정
                                    </Link>
                                    <button onClick={(e) => handleDelete(e)}>
                                        삭제
                                    </button>
                                </>
                            ) : null}
                        </div>
                    </div>
                </>
            ) : (
                <Spinner />
            )}
        </PostContainer>
    );
}

export default Post;
