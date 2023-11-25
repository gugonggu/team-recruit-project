import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        projectType: { type: String, required: true },
        numOfRecruit: { type: Number, required: true },
        grade: { type: Number, required: true },
        department: { type: String, required: true },
        major: { type: String, required: true },
        end: { type: Date, required: true },
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
                required: true,
            },
        ],
        applicants: [
            {
                word: { type: String, required: true, trim: true },
                applicant: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
            },
        ],
        meta: {
            views: { type: Number, required: true, default: 0 },
            likes: { type: Number, required: true, default: 0 },
        },
        recruiting: { type: Boolean, required: true },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
