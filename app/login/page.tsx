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
        console.log("Google login clicked");
        authClient.signIn.social({
            provider: 'google',
            callbackURL: '/dashboard'
        })
    };



    const handleGithubLogin = async () => {
        console.log("GitHub login clicked");
        authClient.signIn.social({
            provider: 'github',
            callbackURL: '/dashboard'
        })

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-xl">

                <h1 className="text-2xl font-semibold text-center mb-6 flex justify-center items-center gap-2">
                    Welcome to       <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-blue-500 rounded-md flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M8 3l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="text-lg font-semibold tracking-tight">Lynk</span>
                    </div>
                </h1>

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