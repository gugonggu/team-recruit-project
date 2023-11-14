import styled from "@emotion/styled";

import { motion } from "framer-motion";

export const FormContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const DefaultForm = styled.form`
    width: 35%;
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

    div {
        margin-top: 10px;
    }

    button {
        background-color: #e11837;
        color: white;
        width: 90%;
        height: 40px;
        margin: auto;
        margin-top: 40px;
        border: none;
        border-radius: 20px;
        font-size: 18px;
        cursor: pointer;
    }
`;

export const AlertBox = styled(motion.div)`
    display: flex;
    align-items: center;
    position: absolute;
    height: 45px;
    width: calc(100% - 125px);
    border: 1px solid tomato;
    border-left: 10px solid tomato;
    border-radius: 10px;
    padding: 10px;
    background-color: #ffd7d5;
    div {
        margin-left: 10px;
    }
    .close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
    .processBar {
        position: absolute;
        background-color: tomato;
        height: 5px;
        bottom: 0;
        left: -11px;
        border-radius: 10px;
    }
`;
