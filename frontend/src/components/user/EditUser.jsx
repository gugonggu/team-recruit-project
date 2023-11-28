import { useState, useEffect, useRef } from "react";
import useDetectClose from "../../hooks/useDetectClose";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginUser } from "../../reducer/userSlice";

import { FormContainer, DefaultForm } from "../../style/FormCSS.js";
import { AlertBox } from "../../style/AlertBoxCSS.js";
import { DropDownUl } from "../../style/DropDownCSS.js";

import { FaX } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

import DropDown from "../DropDown";
import Editor from "../post/Editor";

function EditUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [grade, setGrade] = useState("");
    const [depart, setDepart] = useState("");
    const [major, setMajor] = useState("");
    const [desc, setDesc] = useState("");

    const [alertMsg, setAlertMsg] = useState("");

    const gradeRef = useRef();
    const departRef = useRef();
    const majorRef = useRef();

    const [gradeIsOpen, setGradeIsOpen] = useDetectClose(gradeRef, false);
    const [departIsOpen, setDepartIsOpen] = useDetectClose(departRef, false);
    const [majorIsOpen, setMajorIsOpen] = useDetectClose(majorRef, false);

    const gradeList = [1, 2, 3, 4];
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

    const handleEdit = async (e) => {
        e.preventDefault();
        if (!(name && email && grade && depart && major)) {
            return setAlertMsg("자기소개를 제외한 값은 필수로 채워주세요");
        }

        const body = {
            uid: params.id,
            name: name,
            email: email,
            grade: grade,
            depart: depart,
            major: major,
            desc: desc,
        };
        axios
            .post("/api/user/edit", body)
            .then((res) => {
                if (res.data.success) {
                    dispatch(loginUser({ name: name, email: email }));
                    navigate(`/user/${params.id}`);
                } else {
                    return setAlertMsg(
                        "회원 정보 수정 중에 문제가 발생했습니다"
                    );
                }
            })
            .catch((e) => {
                console.log(e);
                return setAlertMsg("회원 정보 수정 중에 문제가 발생했습니다.");
            });
    };

    useEffect(() => {
        setTimeout(() => {
            setAlertMsg("");
        }, 5200);
    }, [alertMsg]);

    return (
        <FormContainer>
            <DefaultForm>
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
                <h1>회원 정보 수정</h1>
                <label htmlFor="name">이름</label>
                <input
                    id="name"
                    type="text"
                    placeholder="이름을 입력해주세요"
                    required
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                ></input>
                <label htmlFor="email">이메일</label>
                <input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                ></input>
                <div ref={gradeRef} className="gradeDiv">
                    <label htmlFor="grade">학년</label>
                    <input
                        id="grade"
                        type="button"
                        value={grade ? grade : "학년을 선택해주세요"}
                        onClick={() => setGradeIsOpen(!gradeIsOpen)}
                    ></input>
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
                <div className="selectDiv">
                    <div ref={departRef}>
                        <label htmlFor="depart">소속 학부</label>
                        <input
                            id="depart"
                            type="button"
                            value={depart ? depart : "소속 학부를 선택해주세요"}
                            onClick={() => {
                                setMajor("");
                                setDepartIsOpen(!departIsOpen);
                            }}
                        ></input>
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
                    <div ref={majorRef}>
                        <label htmlFor="major">전공</label>
                        <input
                            id="major"
                            type="button"
                            value={
                                depart ? major : "소속 학부를 먼저 선택해주세요"
                            }
                            onClick={() => setMajorIsOpen(!majorIsOpen)}
                            disabled={!depart}
                        ></input>
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
                </div>
                <Editor content={desc} setContent={setDesc} />
                <button onClick={(e) => handleEdit(e)}>제출</button>
            </DefaultForm>
        </FormContainer>
    );
}

export default EditUser;
