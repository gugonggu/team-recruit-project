import User from "../models/User.js";

export const signUp = async (req, res) => {
    const userData = new User(req.body);
    await userData.save();
    return res.sendStatus(200);
};

export const usernameCheck = async (req, res) => {
    return res.sendStatus(200);
};
