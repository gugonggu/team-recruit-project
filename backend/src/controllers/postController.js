import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

export const upload = async (req, res) => {
    const { type, num, grade, depart, major, end, title, content, userId } =
        req.body;
    try {
        const post = new Post({
            projectType: type,
            numOfRecruit: num,
            grade: grade,
            department: depart,
            major: major,
            end: end,
            title: title,
            content: content,
            author: userId,
            comments: [],
            applicants: [],
            meta: {
                views: 0,
                likes: 0,
            },
            recruiting: true,
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
    const {
        searchKey,
        typeFilter,
        departFilter,
        majorFilter,
        gradeFilter,
        sort,
        skip,
    } = req.body;
    const sortKey = {};
    if (sort === "최신순") {
        sortKey.createdAt = -1;
    } else if (sort === "조회순") {
        sortKey.views = -1;
    } else {
        sortKey.stars = -1;
    }
    const findObj = { $or: [], $and: [] };
    if (searchKey) {
        findObj.$or.push(
            { title: { $regex: searchKey } },
            { content: { $regex: searchKey } }
        );
    }

    if (typeFilter) {
        findObj.$and.push({ projectType: typeFilter });
    }
    if (departFilter) {
        findObj.$and.push({ department: departFilter });
    }
    if (majorFilter) {
        findObj.$and.push({ major: majorFilter });
    }
    if (gradeFilter) {
        findObj.$and.push({ grade: gradeFilter });
    }

    if (findObj.$or.length === 0) {
        findObj.$or.push({});
    }
    if (findObj.$and.length === 0) {
        findObj.$and.push({});
    }

    try {
        const list = await Post.find(findObj).sort(sort).skip(skip).limit(10);
        return res.status(200).json({ success: true, list: list });
    } catch (e) {
        return console.log(e);
    }
};

export const getPostInfo = async (req, res) => {
    const { _id, uid } = req.body;
    const post = await Post.findById(_id)
        .populate("author")
        .populate("comments")
        .populate({
            path: "comments",
            populate: {
                path: "author",
            },
        });
    if (!post) {
        return res.status(200).json({ success: false });
    }
    post.meta.views++;
    await post.save();
    if (uid) {
        const user = await User.findById(uid);
        if (!user.seen.includes(_id)) {
            user.seen.push(_id);
            await user.save();
        }
        let userLike = false;
        if (user.likes.includes(_id)) {
            userLike = true;
        }
        return res
            .status(200)
            .json({ success: true, post: post, userLike: userLike });
    } else {
        return res.status(200).json({ success: true, post: post });
    }
};

export const postLike = async (req, res) => {
    const { _id, uid } = req.body;
    const post = await Post.findById(_id);
    const user = await User.findById(uid);
    let info = "";
    if (user.likes.includes(_id)) {
        user.likes.splice(user.likes.indexOf(_id), 1);
        post.meta.likes--;
        info = "minus";
    } else {
        user.likes.push(_id);
        post.meta.likes++;
        info = "plus";
    }
    await post.save();
    await user.save();
    return res.status(200).json({ success: true, info: info });
};

export const addComment = async (req, res) => {
    const { _id, uid, content } = req.body;
    try {
        const post = await Post.findById(_id);
        const comment = new Comment({
            author: uid,
            content: content,
            nestedComments: [],
        });
        await comment.save();
        post.comments.push(comment._id);
        await post.save();
    } catch (e) {
        console.log(e);
        return res.status(304).json({ success: false });
    }
    return res.status(200).json({ success: true });
};
