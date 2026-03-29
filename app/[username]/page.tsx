

import { User } from "@/models/User";
import { Link } from "@/models/Link";
import { connectDB } from "@/lib/db";
import { DecodeError } from "next/dist/shared/lib/utils";

export default async function PublicPage({
    params,
}: {
    params: { username: string };
}) {


    await connectDB();

    const { username } = await params;


    const decodedUsername = decodeURIComponent(username);



    const user = await User.findOne({ username: decodedUsername }).lean();




    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p className="text-slate-400">User not found</p>
            </div>
        );
    }

    const links = await Link.find({ userId: user.authUserId }).lean();

    return (
        <div className="min-h-screen bg-linear-to-br from-[#020617] via-black to-[#020617] text-white flex items-center justify-center px-4">

            {/* MAIN CONTAINER */}
            <div className="w-full max-w-md">

                {/* PROFILE SECTION */}
                <div className="flex flex-col items-center text-center mb-8">

                    <div className="relative p-0.5 rounded-full bg-linear-to-tr from-blue-500 to-cyan-400 mb-4">
                        <img
                            src={user.image || "/default-avatar.png"}
                            className="w-24 h-24 rounded-full object-cover border-4 border-black"
                        />
                    </div>

                    <h1 className="text-2xl font-semibold tracking-tight">
                        {user.username}
                    </h1>

                    {user.bio && (
                        <p className="text-slate-400 text-sm mt-2 max-w-xs">
                            {user.bio}
                        </p>
                    )}
                </div>

                {/* LINKS */}
                <div className="space-y-3">

                    {links.length === 0 ? (
                        <p className="text-center text-slate-500 text-sm">
                            No links added yet
                        </p>
                    ) : (
                        links.map((link: any) => (
                            <a
                                key={link._id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center p-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all duration-200"
                            >
                                <span className="font-medium">
                                    {link.title}
                                </span>
                            </a>
                        ))
                    )}
                </div>

                {/* FOOTER BRAND */}
                <div className="mt-10 text-center">
                    <p className="text-xs text-slate-600">
                        Powered by{" "}
                        <span className="text-blue-500 font-semibold">
                            Lynk
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}