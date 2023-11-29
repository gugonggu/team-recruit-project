import express from "express";

const postRouter = express.Router();

import {
    upload,
    edit,
    getList,
    getPostInfo,
    deletePost,
    postLike,
    addComment,
    editComment,
    deleteComment,
    addNestedComment,
    editNestedComment,
    deleteNestedCommnet,
    application,
    acceptApplication,
    refuseApplication,
} from "../controllers/postController.js";

postRouter.post("/upload", upload);

postRouter.post("/edit", edit);

postRouter.post("/delete", deletePost);

postRouter.post("/list", getList);

postRouter.post("/getpostinfo", getPostInfo);
postRouter.post("/postlike", postLike);
postRouter.post("/addcomment", addComment);
postRouter.post("/editcomment", editComment);
postRouter.post("/deletecomment", deleteComment);
postRouter.post("/addnestedcomment", addNestedComment);
postRouter.post("/editnestedcomment", editNestedComment);
postRouter.post("/deletenestedcomment", deleteNestedCommnet);
postRouter.post("/application", application);
postRouter.post("/acceptapplication", acceptApplication);
postRouter.post("/refuseapplication", refuseApplication);

export default postRouter;
