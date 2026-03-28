import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function POST() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return Response.json({
            error: "Unauthorized"
        }, { status: 401 })
    }

    await connectDB();

    const user = await User.findOne({
        authUserId: session?.user.id
    })

    if (user) {
        return Response.json({
            success: true,
            message: "User already exists on db",
        }, { status: 200 })
    }

    if (!user) {
        const user = await User.create({
            authUserId: session.user.id,
            username: session.user.email,
            image: session.user.image
        });
    }


    console.log(user);

    return Response.json({
        success: true,
        message: "User saved to DB sucessfully!",
        user
    })

}