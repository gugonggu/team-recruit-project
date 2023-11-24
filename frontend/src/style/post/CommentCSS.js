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
        div {
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
    p:last-child {
        margin: 5px 0 0 10px;
    }
`;

export const NoComments = styled.div`
    color: lightgray;
    margin: 20px auto !important;
`;
