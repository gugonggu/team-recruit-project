import { DropDownLi } from "../style/DropDownCSS.js";

function DropDown({ value, isOpen, setIsOpen, setValue }) {
    const clickHandler = () => {
        setValue(value);
        setIsOpen(!isOpen);
    };
    return (
        <DropDownLi onClick={clickHandler}>
            {value === 11 ? "무관" : value === 10 ? "10명 이상" : value}
        </DropDownLi>
    );
}

export default DropDown;
