import { ControllerDropDownLi } from "../style/DropDownCSS.js";

function ControllerDropdown({ value, isOpen, setIsOpen, setValue }) {
    const clickHandler = () => {
        setValue(value);
        setIsOpen(!isOpen);
    };
    return (
        <ControllerDropDownLi onClick={clickHandler}>
            {value === 11
                ? "무관"
                : value === 10
                ? "10명 이상"
                : value === ""
                ? "전체"
                : value}
        </ControllerDropDownLi>
    );
}

export default ControllerDropdown;
