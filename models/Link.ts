import { link } from "fs";
import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

const linkSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, { timestamps: true })


export const Link = mongoose.models.Link || mongoose.model("Link", linkSchema);