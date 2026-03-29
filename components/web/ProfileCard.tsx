"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const ProfileCard = ({ userData }) => {
    const [data, setData] = useState(userData);
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        username: userData?.username || "",
        bio: userData?.bio || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            setData({ ...data, ...formData });

            await axios.put("/api/user/profileUpdate", formData);

            setIsOpen(false);
        } catch (error) {
            console.error(error);
            alert("Update failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCopy = async () => {
        const url = process.env.NEXT_PUBLIC_APP_URL || "";
        await navigator.clipboard.writeText(url + data.username);
        alert("Copied!");
    };

    return (
        <>
            {/* CARD */}
            <div className="w-full">
                <div className="bg-gradient-to-b from-slate-900 to-black border border-slate-800 rounded-2xl p-6 shadow-xl">

                    {/* Profile */}
                    <div className="flex flex-col items-center text-center">
                        <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 mb-4">
                            <Image
                                src={data?.image || "/default-avatar.png"}
                                alt="pfp"
                                width={80}
                                height={80}
                                className="rounded-full border-4 border-black object-cover"
                            />
                        </div>

                        <h2 className="text-xl font-semibold">{data?.username}</h2>
                        <p className="text-xs text-blue-400 mt-1">Public Profile</p>
                    </div>

                    {/* Divider */}
                    <div className="my-5 h-px bg-slate-800" />

                    {/* Bio */}
                    <div>
                        <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">
                            Bio
                        </p>
                        <p className="text-sm text-slate-300">
                            {data?.bio || "No bio added yet."}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 space-y-3">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="w-full bg-white text-black hover:bg-slate-200 font-medium py-2.5 rounded-lg text-sm"
                        >
                            Edit Profile
                        </button>

                        <button
                            onClick={handleCopy}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg text-sm"
                        >
                            Copy Public Link
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur z-50 p-4">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md"
                    >
                        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

                        <div className="space-y-4">
                            <input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                placeholder="Username"
                                className="w-full p-3 bg-black border border-slate-700 rounded-lg text-sm"
                            />

                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                placeholder="Bio"
                                rows={3}
                                className="w-full p-3 bg-black border border-slate-700 rounded-lg text-sm"
                            />
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg text-sm"
                            >
                                {isSubmitting ? "Saving..." : "Save"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="flex-1 bg-slate-800 py-2 rounded-lg text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default ProfileCard;