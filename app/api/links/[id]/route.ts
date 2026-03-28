import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Link } from "@/models/Link";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }  // ← params is a Promise
) {
    await connectDB();
    try {
        // 🔐 Get session
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return Response.json(
                { message: "Unauthorized", success: false },
                { status: 401 }
            );
        }

        const authUserId = session.session.userId;

        // ✅ AWAIT the params
        const { id: linkId } = await params;  // ← Must await params

        // 🔍 Find link
        const link = await Link.findById(linkId);

        if (!link) {
            return Response.json(
                { message: "Link not found", success: false },
                { status: 404 }
            );
        }

        // 🔥 SECURITY CHECK (VERY IMPORTANT)
        if (link.userId !== authUserId) {
            return Response.json(
                { message: "Forbidden", success: false },
                { status: 403 }
            );
        }

        // 🗑️ Delete link
        await Link.findByIdAndDelete(linkId);

        return Response.json({
            message: "Link deleted successfully",
            success: true,
        });

    } catch (error) {
        console.error(error);

        return Response.json(
            { message: "Server error", success: false },
            { status: 500 }
        );
    }
}