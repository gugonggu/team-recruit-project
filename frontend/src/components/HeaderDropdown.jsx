import { StyledLink } from "../style/HeaderCSS.js";
import { HeaderDropdownLi } from "../style/HeaderDropdownCSS.js";

const HeaderDropdown = ({ isOpen, setIsOpen, link, name }) => {
    return (
        <HeaderDropdownLi onClick={() => setIsOpen(!isOpen)}>
            <StyledLink to={link}>{name}</StyledLink>
        </HeaderDropdownLi>
    );
};

export default HeaderDropdown;
