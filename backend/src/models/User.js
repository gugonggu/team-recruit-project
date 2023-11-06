import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    description: { type: String, trim: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    uid: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
