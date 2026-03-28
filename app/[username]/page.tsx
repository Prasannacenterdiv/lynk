import { User } from "@/models/User";
import { Link } from "@/models/Link";
import { connectDB } from "@/lib/db";

export default async function PublicPage({
    params,
}: {
    params: { username: string };
}) {
    await connectDB();

    const { username } = await params;
    console.log(username);
    
    const user = await User.findOne({ username });

    if (!user) {
        return <div>User not found</div>;
    }

    const links = await Link.find({ userId: user.authUserId });

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center">
            <img
                src={user.image}
                className="w-20 h-20 rounded-full mb-4"
            />

            <h1 className="text-xl font-bold">{user.username}</h1>
            <p className="text-neutral-400 mb-6">{user.bio}</p>

            <div className="w-full max-w-sm space-y-3">
                {links.map((link: any) => (
                    <a
                        key={link._id}
                        href={link.url}
                        target="_blank"
                        className="block text-center p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700"
                    >
                        {link.title}
                    </a>
                ))}
            </div>
        </div>
    );
}