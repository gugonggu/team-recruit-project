import styled from "@emotion/styled";

export const PostContainer = styled.div`
    div {
        background-color: white;
        border-radius: 10px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        margin: 20px;
        padding: 10px 20px;
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
        }
        &.postManage {
            padding-bottom: 20px;
            .buttonContainer {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                margin-top: 40px;
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
                    &:hover {
                        opacity: 0.8;
                    }
                }
            }
        }
        &.postComments {
            padding-bottom: 40px;
            div {
                display: flex;
                input {
                    border: none;
                    outline: none;
                    background-color: transparent;
                    border-bottom: 1px solid lightgray;
                    padding: 10px;
                    width: 90%;
                    margin-right: 10px;
                    &:focus {
                        border-bottom: 1px solid #e11837;
                    }
                }
                .commentButton {
                    padding: 5px 10px;
                    width: calc(10% - 1px);
                    background-color: #e11837;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    font-size: 16px;
                    cursor: pointer;
                    &:hover {
                        opacity: 0.8;
                    }
                }
            }
        }
    }
`;

export const ApplicationContainer = styled.div`
    display: flex;
    flex-direction: column;
    label {
        font-size: 16px;
        margin-bottom: 10px;
    }
    div {
        width: 100%;
        display: flex;
        input {
            width: 90%;
            outline: none;
            border: none;
            border-bottom: 1px solid lightgray;
            padding: 10px;
            &:focus {
                border-bottom: 1px solid #e11837;
            }
        }
        button {
            cursor: pointer;
            margin-left: 20px;
            background-color: #e11837;
            color: white;
            padding: 5px 10px;
            width: 10%;
            border: none;
            border-radius: 20px;
            font-size: 16px;
            &:hover {
                opacity: 0.8;
            }
        }
    }
`;

export const ManageContainer = styled.div`
    div {
        .application {
            margin-top: 20px !important;
        }
        div {
            display: flex;
            justify-content: space-between;
            .applyButtonContainer {
                margin-right: 20px;
                button {
                    cursor: pointer;
                    background-color: white;
                    border: none;
                    font-size: 16px;
                    padding: 5px 10px;
                    border-radius: 20px;
                    &:first-of-type {
                        &:hover {
                            background-color: lightgray;
                        }
                    }
                    &:last-of-type {
                        margin-left: 20px;
                        background-color: #e11837;
                        color: white;
                        &:hover {
                            opacity: 0.8;
                        }
                    }
                }
            }
        }
    }
`;

export const MemberContainer = styled.div`
    img {
        width: 100px;
        height: 100px;
        cursor: pointer;
    }
`;
