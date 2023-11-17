import { useState, useEffect, useRef } from "react";
import useDetectClose from "../../hooks/useDetectClose.js";
import axios from "axios";
import Editor from "./Editor";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaX } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

import { FormContainer, PostForm } from "../../style/FormCSS.js";
import { DropDownUl } from "../../style/DropDownCSS.js";
import { AlertBox } from "../../style/AlertBoxCSS.js";
import DropDown from "../DropDown.jsx";

function Upload() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const [type, setType] = useState("");
    const [num, setNum] = useState("");
    const [grade, setGrade] = useState("");
    const [depart, setDepart] = useState("");
    const [major, setMajor] = useState("");
    const [end, setEnd] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [alertMsg, setAlertMsg] = useState("");

    const typeRef = useRef();
    const numRef = useRef();
    const gradeRef = useRef();
    const departRef = useRef();
    const majorRef = useRef();

    const [typeIsOpen, setTypeIsOpen] = useDetectClose(typeRef, false);
    const [numIsOpen, setNumIsOpen] = useDetectClose(numRef, false);
    const [gradeIsOpen, setGradeIsOpen] = useDetectClose(gradeRef, false);
    const [departIsOpen, setDepartIsOpen] = useDetectClose(departRef, false);
    const [majorIsOpen, setMajorIsOpen] = useDetectClose(majorRef, false);

    const typeList = ["스터디", "프로젝트", "연구"];
    const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const gradeList = [1, 2, 3, 4, 11];
    const departList = [
        "International College",
        "글로벌비즈니스대학",
        "디자인대학",
        "미디어콘텐츠대학",
        "미래커리어대학",
        "바이오헬스융합대학",
        "사회과학대학",
        "소프트웨어융합대학",
        "임권택영화예술대학",
    ];
    const [majorList, setMajorList] = useState([]);
    useEffect(() => {
        if (depart === "International College") {
            setMajorList(["외국인학생 전담학과", "캠퍼스아시아학과"]);
        } else if (depart === "글로벌비즈니스대학") {
            setMajorList([
                "경영학부",
                "관광경영 ∙ 컨벤션학과",
                "국제물류학과",
                "국제통상학과",
                "영어학과",
                "일본어학과",
                "중국어학과",
                "호텔경영학과",
            ]);
        } else if (depart === "디자인대학") {
            setMajorList([
                "건축학과",
                "광고홍보학과",
                "디자인학부",
                "패션디자인학과",
            ]);
        } else if (depart === "미디어콘텐츠대학") {
            setMajorList([
                "게임학과",
                "방송영상학과",
                "영상애니메이션학과",
                "웹툰학과",
            ]);
        } else if (depart === "미래커리어대학") {
            setMajorList([
                "ICT융합공학과",
                "사회복지상담학과",
                "사회안전학과",
                "스포츠레저산업학과",
                "시니어운동처방학과",
                "실용콘텐츠창작학과",
            ]);
        } else if (depart === "바이오헬스융합대학") {
            setMajorList([
                "간호학과",
                "방사선학과",
                "보건행정학과",
                "식품영양학과",
                "운동처방학과",
                "임상병리학과",
                "작업치료학과",
                "체육학과",
                "치위생학과",
                "화장품 ∙ 신소재학과",
            ]);
        } else if (depart === "사회과학대학") {
            setMajorList([
                "경찰행정학과",
                "사회복지학과",
                "청소년상담심리학과",
            ]);
        } else if (depart === "소프트웨어융합대학") {
            setMajorList([
                "건축공학과",
                "기계공학과",
                "사회환경공학과",
                "소프트웨어학과",
                "인공지능응용학과",
                "전자공학과",
                "정보보안학과",
                "컴퓨터공학과",
            ]);
        } else if (depart === "임권택영화예술대학") {
            setMajorList(["뮤지컬과", "연기과", "영화과"]);
        } else {
            setMajorList(["학부 선택에 오류가 발생했습니다"]);
        }
    }, [depart]);

    useEffect(() => {
        if (!user.email) {
            navigate("/login");
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !(
                type &&
                num &&
                grade &&
                depart &&
                major &&
                end &&
                title &&
                content
            )
        ) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return setAlertMsg("모든 값을 입력해주세요");
        }
        const body = {
            type: type,
            num: num,
            grade: grade,
            depart: depart,
            major: major,
            end: end,
            title: title,
            content: content,
            userId: user._id,
        };
        axios
            .post("/api/post/upload", body)
            .then((res) => {
                if (res.data.success) {
                    navigate(`/post/${res.data._id}`);
                } else {
                    console.log(res.data.errorMsg);
                    return setAlertMsg(
                        "모집글 업로드 중에 문제가 발생했습니다."
                    );
                }
            })
            .catch((e) => {
                console.log(e);
                return setAlertMsg("모집글 업로드 중에 문제가 발생했습니다");
            });
    };

    useEffect(() => {
        setTimeout(() => {
            setAlertMsg("");
        }, 5200);
    }, [alertMsg]);

    return (
        <FormContainer>
            <PostForm>
                {alertMsg && (
                    <AnimatePresence>
                        <AlertBox
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <FaX className="xIcon" color="tomato" size="20" />
                            <FaX
                                className="close"
                                color="gray"
                                onClick={() => setAlertMsg("")}
                            />
                            <div>
                                <p>에러</p>
                                <p>{alertMsg}</p>
                            </div>
                            <motion.div
                                className="processBar"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{
                                    duration: 5,
                                    ease: "linear",
                                }}
                            ></motion.div>
                        </AlertBox>
                    </AnimatePresence>
                )}
                <section>
                    <h1>모집 기본 정보를 입력해주세요</h1>
                    <div className="input_row">
                        <div className="each_input" ref={typeRef}>
                            <label htmlFor="type">프로젝트 타입</label>
                            <input
                                id="type"
                                type="button"
                                value={
                                    type ? type : "프로젝트 타입을 선택해주세요"
                                }
                                onClick={() => setTypeIsOpen(!typeIsOpen)}
                            />
                            {typeIsOpen && (
                                <DropDownUl>
                                    {typeList.map((v, i) => (
                                        <DropDown
                                            key={i}
                                            value={v}
                                            isOpen={typeIsOpen}
                                            setIsOpen={setTypeIsOpen}
                                            setValue={setType}
                                        />
                                    ))}
                                </DropDownUl>
                            )}
                        </div>
                        <div className="each_input" ref={numRef}>
                            <label htmlFor="type">모집인원</label>
                            <input
                                id="type"
                                type="button"
                                value={
                                    num
                                        ? num === 10
                                            ? "10명 이상"
                                            : num
                                        : "모집 인원을 선택해주세요"
                                }
                                onClick={() => setNumIsOpen(!numIsOpen)}
                            />
                            {numIsOpen && (
                                <DropDownUl>
                                    {numList.map((v, i) => (
                                        <DropDown
                                            key={i}
                                            value={v}
                                            isOpen={numIsOpen}
                                            setIsOpen={setNumIsOpen}
                                            setValue={setNum}
                                        />
                                    ))}
                                </DropDownUl>
                            )}
                        </div>
                    </div>
                    <div className="input_row">
                        <div className="each_input" ref={gradeRef}>
                            <label htmlFor="grade">학년</label>
                            <input
                                id="grade"
                                type="button"
                                value={
                                    grade
                                        ? grade === 11
                                            ? "상관 없음"
                                            : grade
                                        : "학년을 선택해주세요"
                                }
                                onClick={() => setGradeIsOpen(!gradeIsOpen)}
                            />
                            {gradeIsOpen && (
                                <DropDownUl>
                                    {gradeList.map((v, i) => (
                                        <DropDown
                                            key={i}
                                            value={v}
                                            isOpen={gradeIsOpen}
                                            setIsOpen={setGradeIsOpen}
                                            setValue={setGrade}
                                        />
                                    ))}
                                </DropDownUl>
                            )}
                        </div>
                        <div className="each_input" ref={departRef}>
                            <label htmlFor="depart">학부</label>
                            <input
                                id="depart"
                                type="button"
                                value={depart ? depart : "학부를 선택해주세요"}
                                onClick={() => {
                                    setMajor("학부를 먼저 선택해주세요");
                                    setDepartIsOpen(!departIsOpen);
                                }}
                            />
                            {departIsOpen && (
                                <DropDownUl>
                                    {departList.map((v, i) => (
                                        <DropDown
                                            key={i}
                                            value={v}
                                            isOpen={departIsOpen}
                                            setIsOpen={setDepartIsOpen}
                                            setValue={setDepart}
                                        />
                                    ))}
                                </DropDownUl>
                            )}
                        </div>
                    </div>
                    <div className="input_row">
                        <div className="each_input" ref={majorRef}>
                            <label htmlFor="major">전공</label>
                            <input
                                id="major"
                                type="button"
                                value={
                                    depart ? major : "학부를 먼저 선택해주세요"
                                }
                                onClick={() => setMajorIsOpen(!majorIsOpen)}
                                disabled={!depart}
                            />
                            {majorIsOpen && (
                                <DropDownUl>
                                    {majorList.map((v, i) => (
                                        <DropDown
                                            key={i}
                                            value={v}
                                            isOpen={majorIsOpen}
                                            setIsOpen={setMajorIsOpen}
                                            setValue={setMajor}
                                        />
                                    ))}
                                </DropDownUl>
                            )}
                        </div>
                        <div className="each_input">
                            <label htmlFor="end">모집 마감일</label>
                            <input
                                id="end"
                                type="date"
                                onChange={(e) => setEnd(e.currentTarget.value)}
                            />
                        </div>
                    </div>
                </section>
                <section>
                    <h1>모집을 설명해주세요</h1>
                    <div className="postTitle">
                        <label htmlFor="title">제목</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="제목을 입력해주세요"
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                        ></input>
                    </div>
                    <Editor content={content} setContent={setContent} />
                </section>
                <button onClick={(e) => handleSubmit(e)}>제출</button>
            </PostForm>
        </FormContainer>
    );
}

export default Upload;
