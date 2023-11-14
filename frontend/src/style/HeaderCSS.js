import styled from "@emotion/styled";

import { Link } from "react-router-dom";

export const HeaderDiv = styled.div`
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
        }
    }
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
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
    }
`;
