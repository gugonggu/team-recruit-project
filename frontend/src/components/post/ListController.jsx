import { useState, useEffect, useRef } from "react";

import useDetectClose from "../../hooks/useDetectClose.js";

import ControllerDropdown from "../ControllerDropdown";

import { ControllerDropDownUl } from "../../style/DropDownCSS.js";
import { StyledListController } from "../../style/post/ListCSS.js";

import { FaMagnifyingGlass } from "react-icons/fa6";

function ListController({
    searchKey,
    setSearchKey,
    typeFilter,
    setTypeFilter,
    departFilter,
    setDepartFilter,
    majorFilter,
    setMajorFilter,
    gradeFilter,
    setGradeFilter,
    sort,
    setSort,
}) {
    const typeRef = useRef();
    const departRef = useRef();
    const majorRef = useRef();
    const gradeRef = useRef();
    const sortRef = useRef();

    const [typeIsOpen, setTypeIsOpen] = useDetectClose(typeRef, false);
    const [departIsOpen, setDepartIsOpen] = useDetectClose(departRef, false);
    const [majorIsOpen, setMajorIsOpen] = useDetectClose(majorRef, false);
    const [gradeIsOpen, setGradeIsOpen] = useDetectClose(gradeRef, false);
    const [sortIsOpen, setSortIsOpen] = useDetectClose(sortRef, false);

    const typeList = ["", "스터디", "프로젝트", "연구"];
    const gradeList = ["", 1, 2, 3, 4, 11];
    const departList = [
        "",
        "International College",
        "글로벌비즈니스대학",
        "디자인대학",
        "미디어콘텐츠대학",
        "미래커리어대학",
        "바이오헬스융합대학",
        "사회과학대학",
        "소프트웨어융합대학",
        "임권택영화예술대학",
    ];
    const [majorList, setMajorList] = useState([]);
    useEffect(() => {
        if (departFilter === "International College") {
            setMajorList(["", "외국인학생 전담학과", "캠퍼스아시아학과"]);
        } else if (departFilter === "글로벌비즈니스대학") {
            setMajorList([
                "",
                "경영학부",
                "관광경영 ∙ 컨벤션학과",
                "국제물류학과",
                "국제통상학과",
                "영어학과",
                "일본어학과",
                "중국어학과",
                "호텔경영학과",
            ]);
        } else if (departFilter === "디자인대학") {
            setMajorList([
                "",
                "건축학과",
                "광고홍보학과",
                "디자인학부",
                "패션디자인학과",
            ]);
        } else if (departFilter === "미디어콘텐츠대학") {
            setMajorList([
                "",
                "게임학과",
                "방송영상학과",
                "영상애니메이션학과",
                "웹툰학과",
            ]);
        } else if (departFilter === "미래커리어대학") {
            setMajorList([
                "",
                "ICT융합공학과",
                "사회복지상담학과",
                "사회안전학과",
                "스포츠레저산업학과",
                "시니어운동처방학과",
                "실용콘텐츠창작학과",
            ]);
        } else if (departFilter === "바이오헬스융합대학") {
            setMajorList([
                "",
                "간호학과",
                "방사선학과",
                "보건행정학과",
                "식품영양학과",
                "운동처방학과",
                "임상병리학과",
                "작업치료학과",
                "체육학과",
                "치위생학과",
                "화장품 ∙ 신소재학과",
            ]);
        } else if (departFilter === "사회과학대학") {
            setMajorList([
                "",
                "경찰행정학과",
                "사회복지학과",
                "청소년상담심리학과",
            ]);
        } else if (departFilter === "소프트웨어융합대학") {
            setMajorList([
                "",
                "건축공학과",
                "기계공학과",
                "사회환경공학과",
                "소프트웨어학과",
                "인공지능응용학과",
                "전자공학과",
                "정보보안학과",
                "컴퓨터공학과",
            ]);
        } else if (departFilter === "임권택영화예술대학") {
            setMajorList(["", "뮤지컬과", "연기과", "영화과"]);
        } else {
            setMajorList(["학부 선택에 오류가 발생했습니다"]);
        }
    }, [departFilter]);
    const sortList = ["최신순", "조회순", "즐겨찾기순"];

    return (
        <StyledListController>
            <h3>모집글 필터</h3>
            <div className="searchDiv">
                <label htmlFor="search">검색</label>
                <input
                    type="text"
                    id="search"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.currentTarget.value)}
                />
                <FaMagnifyingGlass />
            </div>
            <div ref={typeRef}>
                <label htmlFor="type">프로젝트 타입</label>
                <input
                    id="type"
                    type="button"
                    value={typeFilter ? typeFilter : "전체"}
                    onClick={() => setTypeIsOpen(!typeIsOpen)}
                />
                {typeIsOpen && (
                    <ControllerDropDownUl>
                        {typeList.map((v, i) => (
                            <ControllerDropdown />
                        ))}
                    </ControllerDropDownUl>
                )}
            </div>
            <div ref={departRef}>
                <label htmlFor="depart">학부</label>
                <input
                    id="depart"
                    type="button"
                    value={departFilter ? departFilter : "전체"}
                    onClick={() => {
                        setDepartIsOpen(!departIsOpen);
                        setMajorFilter("");
                    }}
                />
                {departIsOpen && (
                    <ControllerDropDownUl>
                        {departList.map((v, i) => (
                            <ControllerDropdown
                                key={i}
                                value={v}
                                isOpen={departIsOpen}
                                setIsOpen={setDepartIsOpen}
                                setValue={setDepartFilter}
                            />
                        ))}
                    </ControllerDropDownUl>
                )}
            </div>
            <div ref={majorRef}>
                <label htmlFor="major">전공</label>
                <input
                    id="major"
                    type="button"
                    value={
                        majorFilter ? majorFilter : "학부를 먼저 선택해주세요"
                    }
                    onClick={() => setMajorIsOpen(!majorIsOpen)}
                    disabled={!departFilter}
                />
                {majorIsOpen && (
                    <ControllerDropDownUl>
                        {majorList.map((v, i) => (
                            <ControllerDropdown
                                key={i}
                                value={v}
                                isOpen={majorIsOpen}
                                setIsOpen={setMajorIsOpen}
                                setValue={setMajorFilter}
                            />
                        ))}
                    </ControllerDropDownUl>
                )}
            </div>
            <div ref={gradeRef}>
                <label htmlFor="grade">학년</label>
                <input
                    id="grade"
                    type="button"
                    value={gradeFilter ? gradeFilter : "전체"}
                    onClick={() => setGradeIsOpen(!gradeIsOpen)}
                />
                {gradeIsOpen && (
                    <ControllerDropDownUl>
                        {gradeList.map((v, i) => (
                            <ControllerDropdown
                                key={i}
                                value={v}
                                isOpen={gradeIsOpen}
                                setIsOpen={setGradeIsOpen}
                                setValue={setGradeFilter}
                            />
                        ))}
                    </ControllerDropDownUl>
                )}
            </div>
            <div ref={sortRef}>
                <label htmlFor="sort">정렬</label>
                <input
                    id="sort"
                    type="button"
                    value={sort}
                    onClick={() => setSortIsOpen(!sortIsOpen)}
                />
                {sortIsOpen && (
                    <ControllerDropDownUl>
                        {sortList.map((v, i) => (
                            <ControllerDropdown
                                key={i}
                                value={v}
                                isOpen={sortIsOpen}
                                setIsOpen={setSortIsOpen}
                                setValue={setSort}
                            />
                        ))}
                    </ControllerDropDownUl>
                )}
            </div>
        </StyledListController>
    );
}

export default ListController;
