import styled from "@emotion/styled";

export const StyledList = styled.div`
    margin: 50px 20px;
    display: flex;
    @media (max-width: 450px) {
        flex-direction: column-reverse;
    }
    @media (max-width: 450px) {
        margin: 50px 10px;
    }
`;

export const ListContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    button {
        border: none;
        background-color: #e11837;
        border-radius: 20px;
        color: white;
        padding: 10px 15px;
        margin: auto;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
        &:disabled {
            background-color: lightgray;
            cursor: unset;
            &:hover {
                opacity: 1;
            }
        }
    }
    &.about {
        width: 100%;
    }
    @media (max-width: 450px) {
        width: 100%;
    }
`;

export const StyledListItem = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 10px 20px;
    margin-bottom: 20px;
    color: black;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    div {
        display: flex;
        align-items: center;
        .type {
            margin-left: 10px;
            padding: 0px 5px;
            border-radius: 20px;
            span {
                margin-left: 5px;
            }
        }
        .info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            p {
                margin: 0 5px 0 0;
            }
        }
    }
    .meta {
        position: relative;
        margin-top: 18px;
        div {
            .eye {
                color: gray;
                margin-right: 5px;
            }
            .star {
                color: #ffff8c;
                margin-right: 5px;
            }
            &:first-of-type {
                margin-right: 10px;
            }
        }
        p {
            position: absolute;
            right: 0;
            color: gray;
        }
    }
`;

export const StyledListController = styled.div`
    width: 20%;
    height: max-content;
    padding: 20px 0;
    background-color: white;
    border-radius: 10px;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    h3 {
        margin: auto;
        cursor: default;
    }

    div {
        position: relative;
        label {
            margin-left: 5px;
        }
        display: flex;
        flex-direction: column;
        margin: 10px 10px;
        input[type="button"] {
            cursor: pointer;
            border: none;
            background-color: transparent;
            outline: none;
            border-bottom: 1px solid lightgray;
            margin: 0 5px;
            padding: 5px;
            &:focus {
                border-bottom: 1px solid #e11837;
            }
            &:disabled {
                cursor: unset;
            }
        }
        svg {
            position: absolute;
            bottom: 15px;
            right: 10px;
            cursor: pointer;
        }
    }
    .searchDiv {
        display: flex;
        input[type="text"] {
            border: none;
            outline: none;
            border-bottom: 1px solid lightgray;
            margin: 0 5px 5px 5px;
            padding: 5px 25px 5px 5px;
            &:focus {
                border-bottom: 1px solid #e11837;
            }
        }
    }
    @media (max-width: 450px) {
        width: 100%;
        margin-left: 0px;
        margin-bottom: 20px;
    }
`;
