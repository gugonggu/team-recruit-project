import express from "express";
import morgan from "morgan";
import path from "path";

import userRouter from "./routers/userRouter.js";

const app = express();

const reactPath = path.join(path.resolve(), "../frontend/build");

app.use(express.static(reactPath));

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    return res.sendFile(reactPath + "/index.html");
});

app.get("*", (req, res) => {
    return res.sendFile(reactPath + "/index.html");
});

app.use("/api/user", userRouter);

export default app;
