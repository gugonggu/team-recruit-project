import React from "react";

import { FaPeopleGroup, FaBook, FaFlask } from "react-icons/fa6";

function ListProjectType({ type }) {
    if (type === "프로젝트") {
        return (
            <div style={{ backgroundColor: "green" }}>
                <FaPeopleGroup />
                <span>{type}</span>
            </div>
        );
    } else if (type === "스터디") {
        return (
            <div style={{ backgroundColor: "red" }}>
                <FaBook />
                <span>{type}</span>
            </div>
        );
    } else {
        return (
            <div style={{ backgroundColor: "blue" }}>
                <FaFlask />
                <span>{type}</span>
            </div>
        );
    }
}

export default ListProjectType;
