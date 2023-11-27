import styled from "@emotion/styled";

export const MyPageContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    margin: 20px;
    overflow: hidden;
    section {
        h2 {
            padding: 0 30px 30px 30px;
            font-weight: bold;
            font-size: 24px;
            border-bottom: 2px solid lightgray;
        }
        .userInfo {
            display: flex;
            justify-content: space-around;
        }
        .noDesc {
            margin-left: 20px;
            color: lightgray;
        }
    }
    button {
        border: none;
        background-color: #e11837;
        color: white;
        padding: 5px 10px;
        border-radius: 20px;
        cursor: pointer;
        float: right;
        &:hover {
            opacity: 0.8;
        }
    }
`;
