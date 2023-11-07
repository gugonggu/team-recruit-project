import { useState, useEffect } from "react";
import axios from "axios";

import List from "./post/List";

function MainPage() {
    const [list, setList] = useState([]);
    useEffect(() => {
        axios.post("/api/post/list").then((res) => {
            if (res.data.success) {
                setList([...res.data.list]);
            }
        });
    }, []);
    return (
        <div>
            <List list={list} />
        </div>
    );
}

export default MainPage;
