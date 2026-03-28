import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Link } from "@/models/Link";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return Response.json({
            message: "Unauthorized Access!"
        }, { status: 401 })
    }

    await connectDB();
    const authUserId: string = session?.session?.userId!;

    const linkData = await Link.find({ userId: authUserId })

    console.log(linkData);

    return Response.json({
        message: "Links fecthed successfully",
        success: true,
        linkData
    })

}


export async function POST(request: NextRequest) {

    const { title, url } = await request.json();

    const isSecure: Boolean = url.startsWith('http') || url.startsWith('https');

    if (!isSecure) {
        return Response.json({
            message: "Please enter a secure URL",
            success: false
        }, { status: 401 })
    }

    await connectDB();

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return Response.json({
            message: "Unauthorized Access!"
        }, { status: 401 })
    }

    const userLinkData = await Link.create({
        userId: session?.session.userId,
        title,
        url
    })

    return Response.json({
        message: "Your link submitted successfully",
        data: userLinkData,
        success: true
    })

}