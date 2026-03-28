"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation"
export default function UserMenu({ user }: any) {
    const handleLogout = async () => {
        // call your auth client
        await authClient.signOut();
        redirect('/login')
    };

    return (
        <div className="flex items-center gap-3">
            <span>{user.name}</span>

            <img
                src={user.image}
                className="w-8 h-8 rounded-full"
                alt=""
            />
            <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 rounded-lg text-sm"
            >
                Logout
            </button>
        </div>
    );
}