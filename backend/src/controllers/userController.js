import User from "../models/User.js";

export const signUp = async (req, res) => {
    const userData = new User(req.body);
    await userData.save();
    return res.sendStatus(200);
};
