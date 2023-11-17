import styled from "@emotion/styled";

import { motion } from "framer-motion";

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
