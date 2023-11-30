import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginUser } from "../../reducer/userSlice";

import { FormContainer, DefaultForm } from "../../style/FormCSS.js";

function Login() {
    const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const loginFunc = async (e) => {
        e.preventDefault();
        if (!(email && pw)) {
            return alert("모든 값을 채워주세요");
        }

        try {
            const body = {
                email: email,
                pw: pw,
            };
            axios.post(`${PROXY}/api/user/login`, body).then((res) => {
                if (res.data.success) {
                    const { _id, name, email } = res.data.user;
                    dispatch(loginUser({ _id, name, email }));
                    navigate("/");
                } else {
                    return alert(res.data.errorMsg);
                }
            });
        } catch (e) {
            console.log(e);
            return alert("로그인 중에 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setErrorMsg("");
        }, 5000);
    }, [errorMsg]);

    return (
        <FormContainer>
            <DefaultForm>
                <h1>로그인</h1>
                <label htmlFor="email">이메일</label>
                <input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                ></input>
                <label htmlFor="psw">비밀번호</label>
                <input
                    id="psw"
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    required
                    value={pw}
                    onChange={(e) => setPw(e.currentTarget.value)}
                ></input>
                {errorMsg !== "" && <p>{errorMsg}</p>}
                <button
                    onClick={(e) => {
                        loginFunc(e);
                    }}
                >
                    로그인
                </button>
            </DefaultForm>
        </FormContainer>
    );
}

export default Login;
