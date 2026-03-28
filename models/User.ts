import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    authUserId: {
        type: String,
        requred: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        default: "This is my BIO 👋!"
    },
    image: {
        type: String
    }
}, { timestamps: true })


export const User = mongoose.models.User || mongoose.model("User", userSchema);
