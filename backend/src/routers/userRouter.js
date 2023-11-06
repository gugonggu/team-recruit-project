import express from "express";

import { signUp } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);

export default userRouter;
