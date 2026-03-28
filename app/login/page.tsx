"use client";
import { authClient } from "@/lib/auth-client";
import { checkAuth } from "@/lib/checkAuth";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleGoogleLogin = () => {
        // TODO: trigger Google OAuth
        console.log("Google login clicked");
        authClient.signIn.social({
            provider: 'google'
        })
    };



    const handleGithubLogin = async () => {
        console.log("GitHub login clicked");
        authClient.signIn.social({
            provider: 'github'
        })

        // TODO: trigger GitHub OAuth
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-xl">

                {/* Heading */}
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Welcome to <span className="text-blue-600 italic font-thin ml-1">Lynk</span>
                </h1>
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-neutral-700" />
                    <span className="text-sm text-neutral-400">OR</span>
                    <div className="flex-1 h-px bg-neutral-700" />
                </div>

                {/* OAuth Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 py-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 transition"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="google"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </button>

                    <button
                        onClick={handleGithubLogin}
                        className="w-full flex items-center justify-center gap-3 py-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 transition"
                    >
                        <img
                            src="https://www.svgrepo.com/show/512317/github-142.svg"
                            alt="github"
                            className="w-5 h-5 invert"
                        />
                        Continue with GitHub
                    </button>
                </div>

                {/* Footer */}
                <p className="text-sm text-neutral-400 text-center mt-6">
                    See you in the Lynk  🔗
                </p>
            </div>
        </div>
    );
}