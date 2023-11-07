import bcrypt from "bcrypt";
import User from "../models/User.js";

export const signUp = async (req, res) => {
    const { name, email, pw, department } = req.body;
    const exists = await User.exists({ email: email });
    if (exists) {
        return res
            .status(200)
            .json({ success: false, errorMsg: "이미 존재하는 이메일 입니다" });
    }
    try {
        const user = new User({ name, email, password: pw, department });
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
