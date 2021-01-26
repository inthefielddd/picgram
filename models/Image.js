import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: "File URL is required",
    },
    title: {
        type: String,
        required: "Title is required",
    },
    description: String,
    views: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const model = mongoose.model("Image", ImageSchema);

export default model;
