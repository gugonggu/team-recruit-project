import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    HeaderDiv,
    StyledLink,
    StyledLogoLink,
    Nav,
} from "../style/HeaderCSS.js";
import axios from "axios";
import { clearUser } from "../reducer/userSlice.js";

import useDetectClose from "../hooks/useDetectClose.js";
import HeaderDropdown from "./HeaderDropdown.jsx";
import {
    HeaderDropdownUl,
    HeaderDropdownLi,
} from "../style/HeaderDropdownCSS.js";

import { FaCaretUp, FaCaretDown } from "react-icons/fa6";

function Header() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dropdownRef = useRef();
    const [isOpen, setIsOpen] = useDetectClose(dropdownRef, false);
    const dropdownList = [
        { link: "/mypage", name: "마이페이지" },
        { link: ".setting", name: "설정" },
    ];

    const logoutHandler = () => {
        axios.post("/api/user/logout").then((res) => {
            if (res.data.success) {
                dispatch(clearUser());
            }
        });
    };

    return (
        <HeaderDiv>
            <StyledLogoLink to="/">DURP</StyledLogoLink>
            <Nav>
                <li>
                    <StyledLink to="/upload">새 모집 글 작성</StyledLink>
                </li>
                {user.email ? (
                    <div ref={dropdownRef}>
                        <input
                            type="button"
                            value={`${user.name}님, 어서오세요!`}
                            onClick={() => setIsOpen(!isOpen)}
                        />
                        <div onMouseDown={(e) => setIsOpen(!isOpen)}>
                            {isOpen ? <FaCaretUp /> : <FaCaretDown />}
                        </div>
                        {isOpen && (
                            <HeaderDropdownUl>
                                {dropdownList.map((v, i) => {
                                    return (
                                        <HeaderDropdown
                                            key={i}
                                            isOpen={isOpen}
                                            setIsOpen={setIsOpen}
                                            link={v.link}
                                            name={v.name}
                                        />
                                    );
                                })}
                                <HeaderDropdownLi
                                    onClick={() => {
                                        logoutHandler();
                                        navigate("/");
                                    }}
                                >
                                    로그아웃
                                </HeaderDropdownLi>
                            </HeaderDropdownUl>
                        )}
                    </div>
                ) : (
                    <>
                        <li>
                            <StyledLink to="/login">로그인</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/signup">회원가입</StyledLink>
                        </li>
                    </>
                )}
            </Nav>
        </HeaderDiv>
    );
}

export default Header;
