import styled from "@emotion/styled";

import { Link } from "react-router-dom";

export const HeaderDiv = styled.div`
    position: sticky;
    z-index: 99;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    margin: 20px;
    padding: 10px 20px;
    border-radius: 10px;
    height: 50px;
    ul {
        li {
            cursor: pointer;
            a {
                color: black;
            }
        }
    }
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    @media (max-width: 450px) {
        margin: 10px;
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
`;

export const StyledLogoLink = styled(Link)`
    text-decoration: none;
    font-weight: bold;
    font-size: 24px;
    color: #e11837;
`;

export const Nav = styled.ul`
    display: flex;
    li {
        margin: 0px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div {
        position: relative;
        display: flex;
        div {
            cursor: pointer;
            transform: translateY(7px);
        }
        input {
            border: none;
            background-color: transparent;
            font-size: 16px;
            cursor: pointer;
        }
    }
`;
