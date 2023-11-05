import { HeaderDiv, StyledLink } from "../style/HeaderCSS.js";

function Header() {
    return (
        <HeaderDiv>
            <StyledLink to="/">Header</StyledLink>
            <ul>
                <li>
                    <StyledLink to="/">홈</StyledLink>
                </li>
                <li>
                    <StyledLink to="/login">로그인</StyledLink>
                </li>
                <li>로그아웃</li>
                <li>
                    <StyledLink to="/signup">회원가입</StyledLink>
                </li>
            </ul>
        </HeaderDiv>
    );
}

export default Header;
