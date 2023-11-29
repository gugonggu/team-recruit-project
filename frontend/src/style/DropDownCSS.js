import styled from "@emotion/styled";

export const DropDownUl = styled.ul`
    position: absolute;
    z-index: 2;
    top: 68px;
    width: 100%;
    padding-left: 0;
    border: 1px solid lightgray;
    border-radius: 0 0 10px 10px;
`;

export const DropDownLi = styled.li`
    cursor: pointer;
    background-color: white;
    padding: 10px;
    width: calc(100% - 20px);
    display: flex;
    align-items: center;
    justify-content: center;
    :last-child {
        border-radius: 0 0 10px 10px;
    }
    &:hover {
        background-color: lightgray;
    }
`;

export const ControllerDropDownUl = styled.ul`
    position: absolute;
    z-index: 2;
    top: 37px;
    width: 100%;
    padding-left: 0;
    border: 1px solid lightgray;
    border-radius: 0 0 10px 10px;
`;

export const ControllerDropDownLi = styled.li`
    cursor: pointer;
    background-color: white;
    padding: 5px 10px;
    width: calc(100% - 20px);
    display: flex;
    align-items: center;
    font-size: 14px;
    :last-child {
        border-radius: 0 0 10px 10px;
    }
    &:hover {
        background-color: lightgray;
    }
`;
