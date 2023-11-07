import express from "express";

import {
    signUp,
    logIn,
    logOut,
    getUserInfo,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.post("/logout", logOut);

userRouter.post("/getuserinfo", getUserInfo);

export default userRouter;
