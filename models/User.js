import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        avatarUrl: String,
        githubId: Number,
        googleId: Number,
        kakaoId: Number,
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        images: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Image",
            },
        ],
    },
    {
        versionKey: false,
    }
);

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
