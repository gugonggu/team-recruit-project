import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginUser } from "../../reducer/userSlice";

import { FormContainer, DefaultForm, AlertBox } from "../../style/FormCSS.js";

import { FaX } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [grade, setGrade] = useState("");
    const [depart, setDepart] = useState("");
    const [major, setMajor] = useState("");
    const [pw, setPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");

    const [alertMsg, setAlertMsg] = useState("");

    const signUpFunc = async (e) => {
        e.preventDefault();
        if (!(name && email && grade && depart && major && pw && confirmPw)) {
            return setAlertMsg("모든 값을 채워주세요");
        }
        if (pw !== confirmPw) {
            setConfirmPw("");
            return setAlertMsg("비밀번호가 같지 않습니다.");
        }
        if (isNaN(Number(grade)) === true) {
            setGrade("");
            return setAlertMsg("학년값은 숫자로 입력해주세요");
        }

        const body = {
            name: name,
            email: email,
            pw: pw,
            grade: grade,
            department: depart,
            major: major,
        };
        axios
            .post("/api/user/signup", body)
            .then((res) => {
                if (res.data.success) {
                    const { _id, name, email } = res.data.user;
                    dispatch(loginUser({ _id, name, email }));
                    navigate("/");
                } else {
                    return setAlertMsg(res.data.errorMsg);
                }
            })
            .catch((e) => {
                console.log(e);
                return setAlertMsg("회원가입 중에 문제가 발생했습니다.");
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
                <h1>회원가입</h1>
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
                <label htmlFor="grade">학년</label>
                <input
                    id="grade"
                    type="text"
                    placeholder="학년을 입력해주세요"
                    required
                    value={grade}
                    onChange={(e) => setGrade(e.currentTarget.value)}
                ></input>
                <div>
                    <label htmlFor="depart">소속 학부</label>
                    <input
                        id="depart"
                        type="text"
                        placeholder="소속 학부를 선택해주세요"
                        required
                        value={depart}
                        onChange={(e) => setDepart(e.currentTarget.value)}
                    ></input>
                    <label htmlFor="major">전공</label>
                    <input
                        id="major"
                        type="text"
                        placeholder="전공을 선택해주세요"
                        required
                        value={major}
                        onChange={(e) => setMajor(e.currentTarget.value)}
                    ></input>
                </div>
                <label htmlFor="psw">비밀번호</label>
                <input
                    id="psw"
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    required
                    value={pw}
                    onChange={(e) => setPw(e.currentTarget.value)}
                ></input>
                <input
                    type="password"
                    placeholder="비밀번호 확인을 입력해주세요"
                    required
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.currentTarget.value)}
                ></input>
                <button onClick={(e) => signUpFunc(e)}>회원가입</button>
            </DefaultForm>
        </FormContainer>
    );
}

export default SignUp;
