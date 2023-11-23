import express from "express";

const postRouter = express.Router();

import {
    upload,
    edit,
    getList,
    getPostInfo,
    deletePost,
    postLike,
} from "../controllers/postController.js";

postRouter.post("/upload", upload);
postRouter.post("/edit", edit);
postRouter.post("/delete", deletePost);

postRouter.post("/list", getList);
postRouter.post("/getpostinfo", getPostInfo);
postRouter.post("/postlike", postLike);

export default postRouter;
