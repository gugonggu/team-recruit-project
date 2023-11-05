import express from "express";

import { signUp, usernameCheck } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/usernamecheck", usernameCheck);

userRouter.post("/signup", signUp);

export default userRouter;
