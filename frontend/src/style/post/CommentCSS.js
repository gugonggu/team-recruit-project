import styled from "@emotion/styled";

export const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledComment = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-top: 10px !important;
    div {
        display: flex;
        align-items: center;
        a {
            &:first-of-type {
                margin-right: 10px;
            }
        }
        .commentButtonContainer {
            margin-left: auto !important;
            display: flex;
            align-items: center;
            button {
                padding: 5px 10px;
                width: 50px;
                height: 30px;
                border: none;
                border-radius: 20px;
                background-color: transparent;
                cursor: pointer;
                &:hover {
                    background-color: lightgray;
                }
            }
        }
    }
    .content {
        margin: 5px 0 0 10px;
    }
    @media (max-width: 450px) {
        div {
            a {
                font-size: 14px;
            }
            p {
                font-size: 12px;
            }
        }
    }
`;

export const NoComments = styled.div`
    color: lightgray;
    margin: 20px auto !important;
`;

export const EditComent = styled.div`
    button {
        cursor: pointer;
        outline: none;
        border: none;
        background-color: #e11837;
        color: white;
        padding: 5px 20px;
        border-radius: 20px;
        font-size: 16px;
        &:hover {
            opacity: 0.8;
        }
    }
    @media (max-width: 450px) {
        button {
            padding: 5px 10px;
            font-size: 14px;
            white-space: nowrap;
        }
    }
`;

export const AddNestedComment = styled.div`
    padding: 10px 0 0 20px !important;
    button {
        cursor: pointer;
        border: none;
        outline: none;
        background-color: #e11837;
        color: white;
        padding: 5px 20px;
        border-radius: 20px;
        font-size: 16px;
        white-space: nowrap;
        &:hover {
            opacity: 0.8;
        }
    }
`;

export const StyledNestedComment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start !important;
    margin-left: 10px !important;
    padding-left: 10px !important;
    border-left: 1px solid lightgray;
    width: 100%;
    .nestedCommentHeader {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .commentButtonContainer {
            margin-right: 20px;
        }
    }
    .nestedCommentContent {
        margin: 5px 0 0 10px;
    }
`;

export const EditNestedComment = styled.div`
    width: 100%;
    input {
        width: 88%;
    }
    button {
        margin-right: 20px;
        width: calc(12% - 20px);
        outline: none;
        border: none;
        background-color: #e11837;
        color: white;
        font-size: 16px;
        border-radius: 20px;
        padding: 5px 10px;
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
    @media (max-width: 450px) {
        input {
            width: 80%;
        }
        button {
            width: calc(20% - 20px);
            white-space: nowrap;
            font-size: 14px;
            padding: 5px;
        }
    }
`;
