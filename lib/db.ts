import { MongoClient } from "mongodb";
import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

declare global {
    var mongoose: {
        conn: any;
        promise: any;
    };
}

if (!MONGO_URI) {
    throw new Error("Initialize mongo URI in the .envfile")
}

let cached = global.mongoose || { conn: null, promise: null }

export async function connectDB() {
    if (cached.conn) {
        console.log("Using the old DB connection 🔌");

        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI!).then((mongoose) => mongoose)
    }

    cached.conn = await cached.promise;
    global.mongoose = cached;


    return cached.conn;

}

// db-connection for the better-auth

export const client = new MongoClient(MONGO_URI);
export const db = client.db();