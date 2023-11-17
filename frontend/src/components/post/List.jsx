import { useState, useEffect } from "react";
import { StyledLink } from "../../style/HeaderCSS.js";

import axios from "axios";

import ListItem from "./ListItem";
import ListController from "./ListController";

import { StyledList, ListContainer } from "../../style/post/ListCSS.js";

function List() {
    const [list, setList] = useState([]);
    useEffect(() => {
        axios.post("/api/post/list").then((res) => {
            if (res.data.success) {
                setList([...res.data.list]);
            }
        });
    }, []);

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
            </ListContainer>
            <ListController />
        </StyledList>
    );
}

export default List;
