import express from "express";

import {
    signUp,
    logIn,
    logOut,
    getUserInfo,
    edit,
    getAbout,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.post("/logout", logOut);

userRouter.post("/getuserinfo", getUserInfo);
userRouter.post("/edit", edit);

userRouter.post("/getabout", getAbout);

export default userRouter;
