import styled from "@emotion/styled";

export const PostContainer = styled.div`
    div {
        background-color: white;
        border-radius: 10px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        margin: 20px;
        padding: 10px;
        &:first-of-type {
            margin-top: 80px;
        }
        div {
            background-color: transparent;
            border-radius: 0;
            box-shadow: none;
            margin: 0;
            padding: 0;
            &:first-of-type {
                margin-top: 0;
            }
        }
        &.title {
            div {
                display: flex;
                width: 100%;
                .postMeta {
                    float: right;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    p {
                        margin-right: 10px;
                    }
                    svg {
                        margin-right: 5px;
                        &.star {
                            color: #ffff8c;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        &.postInformation {
            display: flex;
            flex-direction: column;
            .postInfoRow {
                display: flex;
                .postInfoEach {
                    width: 50%;
                    display: flex;
                    align-items: center;
                    h4 {
                        width: 100px;
                        margin-right: 20px;
                    }
                }
            }
        }
        &.postContent {
            .buttonContainer {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                a,
                button {
                    background-color: transparent;
                    border: none;
                    text-decoration: none;
                    color: black;
                    font-size: 14px;
                    padding: 5px 10px;
                    border-radius: 20px;
                    cursor: pointer;
                    &:hover {
                        opacity: 0.8;
                    }
                }
                button {
                    margin-left: 10px;
                    background-color: #e11837;
                    color: white;
                }
            }
        }
    }
`;
