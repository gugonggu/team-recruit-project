import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginUser } from "../../reducer/userSlice";

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [depart, setDepart] = useState("");
    const [pw, setPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");

    const [signupFlag, setSignupFlag] = useState(false);

    const signUpFunc = async (e) => {
        e.preventDefault();
        setSignupFlag(true);
        if (!(name && email && depart && pw && confirmPw)) {
            return alert("모든 값을 채워주세요");
        }
        if (pw !== confirmPw) {
            return alert("비밀번호가 같지 않습니다.");
        }

        const body = {
            name: name,
            email: email,
            pw: pw,
            department: depart,
        };
        axios
            .post("/api/user/signup", body)
            .then((res) => {
                if (res.data.success) {
                    const { _id, name, email } = res.data.user;
                    dispatch(loginUser({ _id, name, email }));
                    navigate("/");
                } else {
                    return alert(res.data.errorMsg);
                }
            })
            .catch((e) => {
                console.log(e);
                setSignupFlag(false);
                return alert("회원가입 중에 문제가 발생했습니다.");
            });
    };

    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="이름"
                    required
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                ></input>
                <input
                    type="email"
                    placeholder="이메일"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                ></input>
                <input
                    type="text"
                    placeholder="소속 학과"
                    required
                    value={depart}
                    onChange={(e) => setDepart(e.currentTarget.value)}
                ></input>
                <input
                    type="password"
                    placeholder="비밀번호"
                    required
                    value={pw}
                    onChange={(e) => setPw(e.currentTarget.value)}
                ></input>
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    required
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.currentTarget.value)}
                ></input>
                <button disabled={signupFlag} onClick={(e) => signUpFunc(e)}>
                    가입
                </button>
            </form>
        </div>
    );
}

export default SignUp;
