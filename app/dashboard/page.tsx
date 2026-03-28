import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import Navbar from "@/components/web/Navbar";

export default async function Dashboard() {
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
    });

    // 🆕 Create user if not exists
    if (!existingUser) {
        await User.create({
            authUserId: session.user.id,
            username: session.user.email, // temporary
            image: session.user.image,
        });
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <div className="flex justify-between p-6 border-b border-neutral-800">
                <h1>Dashboard</h1>
            </div>
        </div>
    );
}