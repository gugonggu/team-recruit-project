import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import MainPage from "./components/MainPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </>
    );
}

export default App;
