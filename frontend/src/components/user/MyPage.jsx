import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function MyPage() {
    const user = useSelector((state) => state.user.user);

    const [dbUser, setDbUser] = useState({});

    useEffect(() => {
        const body = {
            _id: user._id,
        };
        axios.post("/api/user/getuserinfo", body).then((res) => {
            if (res.data.success) {
                setDbUser(res.data.user);
            }
        });
    }, []);

    return (
        <div>
            <h1>{user.name}</h1>
            <h3>{user.email}</h3>
            <h5>{dbUser.department}</h5>
        </div>
    );
}

export default MyPage;
