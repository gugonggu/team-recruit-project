import { useState, useEffect } from "react";
import { StyledLink } from "../../style/HeaderCSS.js";

import axios from "axios";

import ListItem from "./ListItem";
import ListController from "./ListController";

import { StyledList, ListContainer } from "../../style/post/ListCSS.js";

function List() {
    const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
    const [searchKey, setSearchKey] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [departFilter, setDepartFilter] = useState("");
    const [majorFilter, setMajorFilter] = useState("");
    const [gradeFilter, setGradeFilter] = useState("");
    const [sort, setSort] = useState("최신순");

    const [list, setList] = useState([]);

    const [skip, setSkip] = useState(0);
    const [loadMore, setLoadMore] = useState(true);

    const getPostList = () => {
        setSkip(0);
        const body = {
            searchKey: searchKey,
            typeFilter: typeFilter,
            departFilter: departFilter,
            majorFilter: majorFilter,
            gradeFilter: gradeFilter,
            sort: sort,
            skip: 0,
        };
        axios
            .post(`${PROXY}/api/post/list`, body)
            .then((res) => {
                if (res.data.success) {
                    setList([...res.data.list]);
                    setSkip(res.data.list.length);
                    if (res.data.list.length < 10) {
                        setLoadMore(false);
                    }
                }
            })
            .catch((e) => {
                return console.log(e);
            });
    };

    const getPostListMore = () => {
        const body = {
            searchKey: searchKey,
            typeFilter: typeFilter,
            departFilter: departFilter,
            majorFilter: majorFilter,
            gradeFilter: gradeFilter,
            sort: sort,
            skip: skip,
        };
        axios
            .post(`${PROXY}/api/post/list`, body)
            .then((res) => {
                if (res.data.success) {
                    setList([...list, ...res.data.list]);
                    setSkip(skip + res.data.list.length);
                    if (res.data.list.length < 10) {
                        setLoadMore(false);
                    }
                }
            })
            .catch((e) => {
                return console.log(e);
            });
    };

    useEffect(() => {
        getPostList();
    }, [typeFilter, departFilter, majorFilter, gradeFilter, sort]);

    return (
        <StyledList>
            <ListContainer>
                {list.map((v, i) => {
                    return (
                        <StyledLink to={`/post/${v._id}`} key={i}>
                            <ListItem value={v} />
                        </StyledLink>
                    );
                })}
                <button disabled={!loadMore} onClick={() => getPostListMore()}>
                    더보기
                </button>
            </ListContainer>
            <ListController
                searchKey={searchKey}
                setSearchKey={setSearchKey}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                departFilter={departFilter}
                setDepartFilter={setDepartFilter}
                majorFilter={majorFilter}
                setMajorFilter={setMajorFilter}
                gradeFilter={gradeFilter}
                setGradeFilter={setGradeFilter}
                sort={sort}
                setSort={setSort}
            />
        </StyledList>
    );
}

export default List;
