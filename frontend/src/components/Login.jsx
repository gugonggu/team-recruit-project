import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase.js";

function Login() {
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
            await firebase.auth().signInWithEmailAndPassword(email, pw);
            navigate("/");
        } catch (e) {
            if (e.code === "auth/user-not-found") {
                setErrorMsg("존재하지 않는 이메일입니다.");
            } else if (e.code === "auth/wrong-password") {
                setErrorMsg("비밀번호가 일치하지 않습니다.");
            } else {
                console.log(e.code);
                setErrorMsg("로그인에 실패했습니다.");
            }
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setErrorMsg("");
        }, 5000);
    }, [errorMsg]);

    return (
        <div>
            <form>
                <input
                    type="email"
                    placeholder="이메일"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                ></input>
                <input
                    type="password"
                    placeholder="비밀번호"
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
            </form>
        </div>
    );
}

export default Login;
