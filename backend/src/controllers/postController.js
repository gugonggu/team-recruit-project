import Post from "../models/Post.js";
import User from "../models/User.js";

export const upload = async (req, res) => {
    const { title, content, userId } = req.body;
    try {
        const post = new Post({
            title: title,
            content: content,
            author: userId,
        });
        await post.save();
        const user = await User.findById(userId);
        user.posts.push(post._id);
        await user.save();
        return res.status(200).json({ success: true, _id: post._id });
    } catch (e) {
        console.log(e);
        return res.status(200).json({ success: false, errorMsg: e });
    }
};

export const edit = async (req, res) => {
    const { title, content, _id } = req.body;
    try {
        await Post.findByIdAndUpdate(_id, { title: title, content: content });
        return res.status(200).json({ success: true });
    } catch (e) {
        console.log(e);
        return res.status(200).json({ success: false });
    }
};

export const deletePost = async (req, res) => {
    const { _id, userId } = req.body;
    try {
        const user = await User.findById(userId);
        const filteredUserPosts = user.posts.filter(
            (v) => String(v) !== String(_id)
        );
        user.posts = filteredUserPosts;
        await user.save();
        await Post.findByIdAndDelete(_id);
        return res.status(200).json({ success: true });
    } catch (e) {
        console.log(e);
        return res.status(200).json({ success: false });
    }
};

export const getList = async (req, res) => {
    const list = await Post.find();
    return res.status(200).json({ success: true, list: list });
};

export const getPostInfo = async (req, res) => {
    const post = await Post.findById(req.body._id);
    if (!post) {
        return res.status(200).json({ success: false });
    }
    return res.status(200).json({ success: true, post: post });
};
