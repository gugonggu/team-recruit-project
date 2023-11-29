import ListProjectType from "./ListProjectType.jsx";

import { StyledListItem } from "../../style/post/ListCSS.js";

import moment from "moment";
import "moment/locale/ko";

import { FaRegEye, FaStar } from "react-icons/fa6";

function ListItem({ value }) {
    const setTime = (c) => {
        return moment(c).format("YYYY년 MMMM Do");
    };
    return (
        <StyledListItem>
            <div className="titleContainer">
                <h3>{value.title}</h3>
                <ListProjectType type={value.projectType} />
            </div>
            <div>
                <div className="info">
                    <p>학부 : {value.department}</p>
                    <p>전공 : {value.major}</p>
                    <p>학년 : {value.grade === 11 ? "무관" : value.grade}</p>
                </div>
            </div>
            <div className="meta">
                <div>
                    <FaRegEye className="eye" />
                    <span>{value.meta.views}</span>
                </div>
                <div>
                    <FaStar className="star" />
                    <span>{value.meta.likes}</span>
                </div>
                <p>모집 마감일 : {setTime(value.end)}</p>
            </div>
        </StyledListItem>
    );
}

export default ListItem;
