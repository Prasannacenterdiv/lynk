import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import ProfileCard from "@/components/web/ProfileCard";
import SubmitLink from "@/components/web/SubmitLink";
import Navbar from "@/components/web/Nav";

export default async function Dashboard() {
    let userData = null;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    await connectDB();

    const existingUser = await User.findOne({
        authUserId: session.user.id,
    }).lean();

    if (!existingUser) {
        const response = await User.create({
            authUserId: session.user.id,
            username: session.user.email,
            image: session.user.image,
        });

        userData = response.toObject();
    } else {
        userData = existingUser;
    }

    if (userData) {
        userData = {
            ...userData,
            _id: userData._id.toString(),
        };
    }

    return (

        <>
        <Navbar />
        <div className="min-h-[calc(100vh-60px)] bg-linear-to-br from-blue-950 via-blue-900 to-black text-white px-6 py-6">
            <div className="max-w-7xl mx-auto flex gap-6 h-full flex-col items-center">
                <div className="min-w-[70%] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg">
                    <div className="h-full flex flex-col">
                        <h2 className="text-4xl font-semibold mb-4 text-white/80 text-center">Profile</h2>
                        <div className="flex-1 flex items-center justify-center">
                            <ProfileCard userData={userData} />
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Your Links</h1>
                            <p className="text-sm text-white/60">
                                Manage and organize all your social links in one place
                            </p>
                        </div>
                    </div>

                    <div className="mb-4 space-y-2">
                        <div className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm px-3 py-2 rounded-lg">
                            <span className="mt-0.5">⚠️</span>
                            <p>Links must start with <span className="font-semibold">http://</span> or <span className="font-semibold">https://</span></p>
                        </div>
                        <div className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm px-3 py-2 rounded-lg">
                            <span className="mt-0.5">⚠️</span>
                            <p>If your public link is not working, try updating your profile name</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden rounded-xl border border-white/10 bg-black/30 p-4">
                        <SubmitLink />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}