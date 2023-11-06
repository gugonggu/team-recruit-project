import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import firebase from "./firebase.js";

import { useDispatch } from "react-redux";
import { loginUser, clearUser } from "./reducer/userSlice.js";

import Header from "./components/Header";
import MainPage from "./components/MainPage";
import SignUp from "./components/user/SignUp";
import Login from "./components/user/Login";
import Upload from "./components/post/Upload.jsx";
import MyPage from "./components/user/MyPage.jsx";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            if (userInfo !== null) {
                dispatch(loginUser(userInfo.multiFactor.user));
            } else {
                dispatch(clearUser());
            }
        });
    }, []);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/upload" element={<Upload />}></Route>
                <Route path="/user:id" element={<MyPage />}></Route>
            </Routes>
        </>
    );
}

export default App;
