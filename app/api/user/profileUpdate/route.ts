import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
    const body = await req.json();

    const session = await auth.api.getSession({
        headers: await headers()
    })

    await connectDB()
    console.log(session?.session?.userId);
    const authUserId = session?.session.userId;
    const userData = await User.findOneAndUpdate({ authUserId }, body, { returnDocument: 'after' });
    console.log(userData);

    return Response.json({
        message: "Hitting /api/user/profileUpdate",
        data: userData,
    }, { status: 200 })
}