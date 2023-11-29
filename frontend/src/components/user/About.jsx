import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

import ListItem from "../post/ListItem";
import Spinner from "../Spinner";
import { StyledList, ListContainer } from "../../style/post/ListCSS.js";
import { StyledLink } from "../../style/HeaderCSS.js";

function About() {
    const params = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const [searchParams, setSearchParams] = useSearchParams();
    const post = searchParams.get("post");
    const seen = searchParams.get("seen");
    const like = searchParams.get("like");
    const belong = searchParams.get("belong");

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(() => {
        if (!user._id) {
            navigate("/");
        }
        const body = {
            uid: params.id,
            post: post,
            seen: seen,
            like: like,
            belong: belong,
        };
        axios
            .post("/api/user/getabout", body)
            .then((res) => {
                if (res.data.success) {
                    setList(res.data.list);
                    setLoading(false);
                }
            })
            .catch((e) => console.log(e));
    }, [post, seen, like, belong]);

    return (
        <StyledList>
            {loading ? (
                <Spinner />
            ) : (
                <ListContainer className="about">
                    {list ? (
                        list.map((v, i) => {
                            return (
                                <StyledLink to={`/post/${v._id}`} key={i}>
                                    <ListItem value={v} />
                                </StyledLink>
                            );
                        })
                    ) : (
                        <p>아직 아무런 데이터가 없습니다</p>
                    )}
                </ListContainer>
            )}
        </StyledList>
    );
}

export default About;
