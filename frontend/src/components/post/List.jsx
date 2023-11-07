import { Link } from "react-router-dom";

import moment from "moment";
import "moment/locale/ko";

function List({ list }) {
    const setTime = (c) => {
        return moment(c).format("YYYY년 MMMM Do, hh:mm");
    };

    return (
        <div>
            {list.map((v, i) => {
                return (
                    <Link to={`/post/${v._id}`} key={i}>
                        <p>{v.title}</p>
                        <p>{setTime(v.createdAt)}</p>
                    </Link>
                );
            })}
        </div>
    );
}

export default List;
