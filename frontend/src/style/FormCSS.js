import styled from "@emotion/styled";

export const FormContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const DefaultForm = styled.form`
    width: 50%;
    background-color: white;
    margin: 20px;
    padding: 50px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    h1 {
        font-weight: bold;
        font-size: 36px;
        margin: auto;
        margin-bottom: 30px;
    }

    label {
        font-size: 20px;
        margin: 15px 0 5px 0;
    }

    input {
        border: none;
        border-bottom: 1px solid #f1f1f1;
        padding: 10px;
        :focus {
            outline: none;
            border-bottom: 1px solid #e11837;
        }
    }

    .gradeDiv {
        position: relative;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        input {
            color: gray;
        }
        ul {
            position: absolute;
            z-index: 2;
            left: 0;
            top: 33px;
            width: 100%;
            padding-left: 0;
            transform: translateY(40px);
        }
    }

    input[type="button"] {
        background-color: white;
        cursor: pointer;
    }
    input:disabled {
        cursor: not-allowed;
    }

    .selectDiv {
        margin: 10px 0 10px 0;
        display: flex;
        justify-content: space-around;
        div {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 50%;
            label {
                margin-top: 10px;
                margin-right: 5px;
            }
            input {
                color: gray;
            }
            input:disabled {
                color: lightgray;
            }
        }
    }

    .quill {
        margin-top: 10px;
        .ql-toolbar {
            .ql-formats {
                button {
                    margin-top: 0px;
                }
            }
        }
        .ql-container {
            .ql-editor {
                min-height: 300px;
            }
        }
    }

    button {
        background-color: #e11837;
        color: white;
        width: 100%;
        height: 40px;
        margin: auto;
        margin-top: 50px;
        border: none;
        border-radius: 20px;
        font-size: 18px;
        cursor: pointer;
        &.editUser {
            margin-top: 120px !important;
        }
    }
    @media (max-width: 450px) {
        width: 80%;
        margin: 10px;
        padding: 30px;
        .selectDiv {
            flex-direction: column;
            div {
                width: 100%;
            }
        }
    }
`;

export const PostForm = styled.form`
    position: relative;
    background-color: white;
    border-radius: 10px;
    width: 65%;
    margin: 20px;
    padding: 0 50px 50px 50px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    section {
        h1 {
            padding: 30px;
            font-weight: bold;
            font-size: 24px;
            border-bottom: 2px solid lightgray;
        }

        .input_row {
            display: flex;
            margin-top: 50px;
            .each_input {
                width: 50%;
                display: flex;
                flex-direction: column;
                position: relative;
                label {
                    font-size: 18px;
                }
                input {
                    background-color: transparent;
                    border: none;
                    border-bottom: 1px solid lightgray;
                    padding: 10px;
                    margin: 0 20px;
                    color: gray;
                    &:focus {
                        outline: none;
                        border-bottom: 1px solid #e11837;
                    }
                }
                ul {
                    top: 50px;
                    width: calc(100% - 40px);
                    transform: translateX(20px);
                }
            }
        }

        .postTitle {
            margin-top: 50px;
            display: flex;
            flex-direction: column;
            label {
                font-size: 18px;
            }
            input {
                border: none;
                border-bottom: 1px solid lightgray;
                padding: 10px;
                margin: 10px;
                &:focus {
                    outline: none;
                    border-bottom: 1px solid #e11837;
                }
            }
        }

        .quill {
            margin-top: 10px;
            .ql-toolbar {
                .ql-formats {
                    button {
                        margin-top: 0px;
                    }
                }
            }
            .ql-container {
                .ql-editor {
                    min-height: 300px;
                }
            }
        }
        &:last-of-type {
            margin-top: 100px;
        }

        .linkContainer {
            display: flex;
            flex-direction: column;
            label {
                font-size: 18px;
            }
            input {
                margin-top: 20px;
                background-color: transparent;
                outline: none;
                border: none;
                padding: 10px;
                border-bottom: 1px solid lightgray;
                &:focus {
                    border-bottom: 1px solid #e11837;
                }
            }
        }
    }

    button {
        background-color: #e11837;
        color: white;
        height: 40px;
        float: right;
        border: none;
        margin-top: 20px;
        border-radius: 20px;
        width: 100px;
        font-size: 18px;
        cursor: pointer;
    }

    .stateSet {
        display: flex;
        flex-direction: column;
        label {
            margin-top: 10px;
            font-size: 18px;
        }
        input {
            border: none;
            background-color: white;
            border-bottom: 1px solid lightgray;
            margin: 0 20px;
            padding: 10px;
            font-size: 16px;
            &:active {
                border-bottom: 1px solid #e11837;
            }
        }
    }

    @media (max-width: 450px) {
        padding: 0px 10px 20px 10px;
        margin: 20px 0px;
        width: 90%;
        section {
            h1 {
                padding: 20px 5px;
            }
        }
        .input_row {
            flex-direction: column;
            .each_input {
                width: 100% !important;
                margin-bottom: 20px;
            }
            margin-top: 0px !important;
        }
    }
`;
