import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import path from "path";

import userRouter from "./routers/userRouter.js";
import postRouter from "./routers/postRouter.js";

import { localsMiddleware } from "./middleware.js";

const app = express();

const reactPath = path.join(path.resolve(), "../frontend/build");

app.use(express.static(reactPath));

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);

app.use(localsMiddleware);

app.get("/", (req, res) => {
    return res.sendFile(reactPath + "/index.html");
});

app.get("*", (req, res) => {
    return res.sendFile(reactPath + "/index.html");
});

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

export default app;
