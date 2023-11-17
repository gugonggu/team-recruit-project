import ListProjectType from "./ListProjectType.jsx";

import { StyledListItem } from "../../style/post/ListCSS.js";

import moment from "moment";
import "moment/locale/ko";

import { FaDoorOpen, FaDoorClosed, FaRegEye, FaStar } from "react-icons/fa6";

function ListItem({ value }) {
    const setTime = (c) => {
        return moment(c).format("YYYY년 MMMM Do");
    };
    return (
        <StyledListItem>
            <div className="titleContainer">
                {value.recruiting ? (
                    <div>
                        <FaDoorOpen />
                        <span>모집중</span>
                    </div>
                ) : (
                    <div>
                        <FaDoorClosed />
                        <span>모집 마감</span>
                    </div>
                )}
                <h3>{value.title}</h3>
            </div>
            <div>
                <ListProjectType type={value.projectType} />
                {/*
                    프로젝트 : 그린
                    스터디 : 레드 or 옐로
                    연구 : 블루
                */}
                <div>
                    <p>학년 : {value.grade}</p>
                    <p>학부 : {value.department}</p>
                    <p>전공 : {value.major}</p>
                </div>
            </div>
            <div>
                <div>
                    <FaRegEye />
                    <span>{value.meta.views}</span>
                </div>
                <div>
                    <FaStar />
                    <span>{value.meta.stars}</span>
                </div>
                <p>모집 마감일 : {setTime(value.end)}</p>
            </div>
        </StyledListItem>
    );
}

export default ListItem;
