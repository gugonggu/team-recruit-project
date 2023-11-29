import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";

import all from "./style/reset.js";
import { Global } from "@emotion/react";

import Header from "./components/Header";
import MainPage from "./components/MainPage";
import SignUp from "./components/user/SignUp";
import Login from "./components/user/Login";
import Upload from "./components/post/Upload.jsx";
import MyPage from "./components/user/MyPage.jsx";
import Post from "./components/post/Post";
import Error404 from "./components/Error404";
import Edit from "./components/post/Edit";
import EditUser from "./components/user/EditUser.jsx";
import About from "./components/user/About.jsx";

function App() {
    const user = useSelector((state) => state.user);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <>
            <Global styles={all} />
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/upload" element={<Upload />}></Route>
                <Route path="/404" element={<Error404 />}></Route>
                <Route path="/user/:id" element={<MyPage />}></Route>
                <Route path="/user/edit/:id" element={<EditUser />}></Route>
                <Route path="/user/:id/about" element={<About />}></Route>
                <Route path="/post/:id" element={<Post />}></Route>
                <Route path="/post/edit/:id" element={<Edit />}></Route>
            </Routes>
        </>
    );
}

export default App;
