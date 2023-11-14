import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        projectType: { type: String, required: true },
        NumOfRecruit: { type: Number },
        begin: { type: Date },
        end: { type: Date },
        grade: { type: Number, required: true },
        department: { type: String, required: true },
        major: { type: String, required: true },
        content: { type: String, required: true },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        meta: {
            views: { type: Number, required: true },
            dibs: { type: Number, required: true },
        },
        recruiting: { type: Boolean, required: true },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
