import styled from "@emotion/styled";

export const HeaderDropdownUl = styled.ul`
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 35px;
`;

export const HeaderDropdownLi = styled.li`
    background-color: white;
    padding: 10px 5px;
    width: 120px;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;

    &:first-of-type {
        border-radius: 10px 10px 0 0;
        border-top: 1px solid lightgray;
    }

    &:last-child {
        border-radius: 0 0 10px 10px;
        border-bottom: 1px solid lightgray;
    }

    &:hover {
        background-color: lightgray;
    }
`;
