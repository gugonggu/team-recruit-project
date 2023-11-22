import Post from "../models/Post.js";
import User from "../models/User.js";

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
    const { searchKey, departFilter, majorFilter, gradeFilter, sort, skip } =
        req.body;
    const sortKey = {};
    if (sort === "최신순") {
        sortKey.createdAt = -1;
    } else if (sort === "조회순") {
        sortKey.views = -1;
    } else {
        sortKey.starts = -1;
    }
    const findObj = { $or: [], $and: [] };
    if (!searchKey && !departFilter && !majorFilter && !gradeFilter) {
        findObj.$or.push({});
        findObj.$and.push({});
    }
    if (searchKey) {
        findObj.$and.push({});
        findObj.$or.push(
            { title: { $regex: searchKey } },
            { content: { $regex: searchKey } }
        );
    }
    if (departFilter && !majorFilter && !gradeFilter) {
        findObj.$or.push({});
        findObj.$and.push({ department: departFilter });
    } else if (departFilter && majorFilter && !gradeFilter) {
        findObj.$or.push({});
        findObj.$and.push({ department: departFilter }, { major: majorFilter });
    } else if (departFilter && majorFilter && gradeFilter) {
        findObj.$or.push({});
        findObj.$and.push(
            { department: departFilter },
            { major: majorFilter },
            { grade: gradeFilter }
        );
    } else if (departFilter && !majorFilter && gradeFilter) {
        findObj.$or.push({});
        findObj.$and.push({ department: departFilter }, { grade: gradeFilter });
    } else if (!departFilter && !majorFilter && gradeFilter) {
        findObj.$or.push({});
        findObj.$and.push({ grade: gradeFilter });
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
    const post = await Post.findById(_id).populate("author");
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
    }
    return res.status(200).json({ success: true, post: post });
};
