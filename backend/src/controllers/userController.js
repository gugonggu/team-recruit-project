import bcrypt from "bcrypt";
import User from "../models/User.js";

export const signUp = async (req, res) => {
    const { name, email, pw, grade, department, major } = req.body;
    const exists = await User.exists({ email: email });
    if (exists) {
        return res
            .status(200)
            .json({ success: false, errorMsg: "이미 존재하는 이메일 입니다" });
    }
    try {
        const user = new User({
            name,
            email,
            password: pw,
            grade,
            department,
            major,
            posts: [],
            seen: [],
            likes: [],
        });
        await user.save();
        req.session.loggedIn = true;
        req.session.user = user;
        return res.status(200).json({ success: true, user: user });
    } catch (e) {
        console.log(e);
        return res.status(200).json({ success: false, errorMsg: e });
    }
};

export const logIn = async (req, res) => {
    const { email, pw } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(200).json({
            success: false,
            errorMsg: "이 이메일로 생성된 계정을 찾을 수 없습니다",
        });
    }
    const ok = await bcrypt.compare(pw, user.password);
    if (!ok) {
        return res
            .status(200)
            .json({ success: false, errorMsg: "틀린 비밀번호 입니다." });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.status(200).json({ success: true, user: user });
};

export const logOut = (req, res) => {
    req.session.destroy();
    return res.status(200).json({ success: true });
};

export const getUserInfo = async (req, res) => {
    const user = await User.findById(req.body._id);
    return res.status(200).json({ success: true, user: user });
};

export const edit = async (req, res) => {
    const { uid, name, email, grade, depart, major, desc } = req.body;
    try {
        const user = await User.findByIdAndUpdate(uid, {
            name: name,
            email: email,
            grade: grade,
            department: depart,
            major: major,
            description: desc,
        });
        return res.status(200).json({
            success: true,
            userInfo: { _id: user._id, name: user.name, email: user.email },
        });
    } catch (e) {
        console.log(e);
        return res.status(304).json({ success: false });
    }
};

export const getAbout = async (req, res) => {
    const { uid, post, seen, like, belong } = req.body;
    try {
        let list = [];
        if (post) {
            const user = await User.findById(uid).populate("posts");
            list = user.posts;
        } else if (seen) {
            const user = await User.findById(uid).populate("seen");
            list = user.seen;
        } else if (like) {
            const user = await User.findById(uid).populate("likes");
            list = user.likes;
        } else if (belong) {
            const user = await User.findById(uid).populate("belong");
            list = user.belong;
        } else {
            list = [];
        }
        return res.status(200).json({ success: true, list: list });
    } catch (e) {
        console.log(e);
        return res.status(304).json({ success: false });
    }
};
