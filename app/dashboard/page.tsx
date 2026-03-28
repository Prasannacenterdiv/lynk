import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import ProfileCard from "@/components/web/ProfileCard";

export default async function Dashboard() {
    let userData = null;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    await connectDB();

    // 🔍 Check if user exists
    const existingUser = await User.findOne({
        authUserId: session.user.id,
    }).lean(); // 👈 Add .lean() to get plain object

    // 🆕 Create user if not exists
    if (!existingUser) {
        const response = await User.create({
            authUserId: session.user.id,
            username: session.user.email, // temporary
            image: session.user.image,
        });

        // Convert the created document to plain object
        userData = response.toObject(); // 👈 Convert to plain object
    }
    else {
        userData = existingUser; // Already plain object from .lean()
    }

    // Optional: Convert _id to string if needed
    if (userData) {
        userData = {
            ...userData,
            _id: userData._id.toString(), // Convert ObjectId to string
        };
    }

    return (
        <div className="text-white min-w-7xl bg-blue-950 mx-auto h-[calc(100vh-60px)] flex">
            <div className="flex-1 border-r border-white/20 p-4">
                <ProfileCard userData={userData} />
            </div>
            <div className="flex-1 p-4">Links</div>
        </div>
    );
}