import { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../firebase.js";
import axios from "axios";

function SignUp() {
    const navigate = useNavigate();

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
        if (pw.length < 6) {
            return alert("비밀번호를 6글자 이상 입력해 주세요");
        }
        if (pw !== confirmPw) {
            return alert("비밀번호가 같지 않습니다.");
        }
        let createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, pw);
        await createdUser.user.updateProfile({ displayName: name });

        const body = {
            email: createdUser.user.multiFactor.user.email,
            name: createdUser.user.multiFactor.user.displayName,
            department: depart,
            uid: createdUser.user.multiFactor.user.uid,
        };
        axios
            .post("/api/user/signup", body)
            .then((res) => {
                navigate("/");
            })
            .catch((e) => {
                console.log(e);
                setSignupFlag(false);
                return alert("회원가입에 문제가 발생했습니다.");
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
