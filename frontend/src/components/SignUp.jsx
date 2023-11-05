import { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase.js";
import axios from "axios";

function SignUp() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");

    const [usernameFlag, setUsernameFlag] = useState(false);
    const [usenameInfo, setUsernameInfo] = useState("");

    const [signupFlag, setSignupFlag] = useState(false);

    const checkUsername = (e) => {
        e.preventDefault();
        if (!username) {
            return alert("닉네임을 입력해주세요.");
        }
        const body = {
            username: username,
        };
        axios
            .post("/api/user/usernamecheck", body)
            .then((res) => {
                setUsernameFlag(true);
                setUsernameInfo("사용 가능한 닉네임입니다.");
            })
            .catch((e) => {
                setUsernameFlag(false);
                setUsernameInfo("사용할 수 없는 닉네임입니다.");
            });
    };

    const signUpFunc = async (e) => {
        e.preventDefault();
        setSignupFlag(true);
        if (!(username && email && pw && confirmPw)) {
            return alert("모든 값을 채워주세요");
        }
        if (pw.length < 6) {
            return alert("비밀번호를 6글자 이상 입력해 주세요");
        }
        if (pw !== confirmPw) {
            return alert("비밀번호가 같지 않습니다.");
        }
        if (!usernameFlag) {
            return alert("닉네임 중복 검사를 진행해 주세요");
        }
        let createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, pw);
        await createdUser.user.updateProfile({ displayName: username });

        const body = {
            email: createdUser.user.multiFactor.user.email,
            userName: createdUser.user.multiFactor.user.displayName,
            uid: createdUser.user.multiFactor.user.uid,
        };
        axios
            .post("/api/user/signup", body)
            .then((res) => {
                navigate("/login");
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
                    placeholder="닉네임"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                ></input>
                {usenameInfo}
                <button onClick={(e) => checkUsername(e)}>
                    닉네임 중복 검사
                </button>
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
