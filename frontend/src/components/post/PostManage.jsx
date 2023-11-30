import { Link } from "react-router-dom";

import {
    ManageContainer,
    MemberContainer,
    ApplicationContainer,
} from "../../style/post/PostCSS.js";

import kakaoSvg from "../../img/kakao.svg";

function PostManage({
    user,
    postInfo,
    handleAccept,
    handleRefuse,
    word,
    setWord,
    handleApplication,
}) {
    if (user._id) {
        if (postInfo.author._id === user._id) {
            return (
                <ManageContainer>
                    <h2>모집 관리</h2>
                    {postInfo.applicants.length === 0 ? (
                        <p>아직 아무도 신청하지 않았습니다</p>
                    ) : (
                        <>
                            {postInfo.applicants.map((v, i) => {
                                return (
                                    <div key={i}>
                                        <div className="application">
                                            <div>
                                                <Link
                                                    to={`/user/${v.applicant._id}`}
                                                >
                                                    {v.applicant.name}
                                                </Link>
                                                <span>
                                                    님이 신청하셨습니다.
                                                </span>
                                            </div>
                                            <div className="applyButtonContainer">
                                                <button
                                                    onClick={(e) =>
                                                        handleAccept(
                                                            e,
                                                            v.applicant._id
                                                        )
                                                    }
                                                >
                                                    수락
                                                </button>
                                                <button
                                                    onClick={(e) =>
                                                        handleRefuse(
                                                            e,
                                                            v.applicant._id
                                                        )
                                                    }
                                                >
                                                    거절
                                                </button>
                                            </div>
                                        </div>
                                        <p>
                                            {v.applicant.name}님의 한마디 :{" "}
                                            {v.word}
                                        </p>
                                        <hr />
                                    </div>
                                );
                            })}
                        </>
                    )}
                    {postInfo.members.length !== 0 ? (
                        <>
                            <h3>현재 소속 멤버</h3>
                            <ul>
                                {postInfo.members.map((v, i) => {
                                    return (
                                        <li key={i}>
                                            <Link to={`/user/${v._id}`}>
                                                {v.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    ) : null}
                </ManageContainer>
            );
        } else if (postInfo.members.some((v) => v._id === user._id)) {
            return (
                <MemberContainer>
                    <h2>오픈채팅 링크</h2>
                    <p>
                        아래 이미지 클릭시 카카오톡 오픈채팅 링크로 연결됩니다.
                    </p>
                    <img
                        src={kakaoSvg}
                        alt="open chatting link"
                        onClick={() => window.open(postInfo.Link)}
                    ></img>
                </MemberContainer>
            );
        } else if (
            postInfo.applicants.some((v) => v.applicant._id === user._id)
        ) {
            return (
                <>
                    <h2>모집 참여 수락 대기중</h2>
                    <p>
                        현재 팀장님의 응답을 기다리고 있습니다.
                        <br />
                        조금만 기다려주세요!
                    </p>
                </>
            );
        } else {
            return (
                <ApplicationContainer>
                    {postInfo.recruiting ? (
                        <>
                            <h2>모집 신청</h2>
                            <label htmlFor="word">팀장에게 남길 한마디</label>
                            <div>
                                <input
                                    type="text"
                                    id="word"
                                    placeholder="팀장에게 남길 한마디를 작성해주세요"
                                    value={word}
                                    onChange={(e) =>
                                        setWord(e.currentTarget.value)
                                    }
                                />
                                <button onClick={(e) => handleApplication(e)}>
                                    신청
                                </button>
                            </div>
                        </>
                    ) : (
                        <h3>모집이 마감되었습니다</h3>
                    )}
                </ApplicationContainer>
            );
        }
    } else {
        return (
            <>
                <h2>로그인 필요</h2>
                <p>모집에 신청하려면, 먼저 로그인을 해야 합니다</p>
                <Link to="/login">로그인 하러 가기 &rarr;</Link>
            </>
        );
    }
}

export default PostManage;
