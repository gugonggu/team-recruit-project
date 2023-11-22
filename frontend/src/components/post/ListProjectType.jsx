import React from "react";

import { FaPeopleGroup, FaBook, FaFlask } from "react-icons/fa6";

function ListProjectType({ type }) {
    if (type === "프로젝트") {
        return (
            <div
                className="type"
                style={{ backgroundColor: "#B2FA5C", padding: "5px 10px" }}
            >
                <FaPeopleGroup />
                <span>{type}</span>
            </div>
        );
    } else if (type === "스터디") {
        return (
            <div
                className="type"
                style={{ backgroundColor: "#FF5675", padding: "5px 10px" }}
            >
                <FaBook />
                <span>{type}</span>
            </div>
        );
    } else {
        return (
            <div
                className="type"
                style={{ backgroundColor: "#00C3FF", padding: "5px 10px" }}
            >
                <FaFlask />
                <span>{type}</span>
            </div>
        );
    }
}

export default ListProjectType;
