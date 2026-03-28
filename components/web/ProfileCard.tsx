"use client"
import axios from 'axios';
import Image from 'next/image'
import { useState } from 'react';

const ProfileCard = ({ userData }) => {
    const [data, setData] = useState(userData);
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        username: userData?.username || "",
        bio: userData?.bio || ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // update UI (later replace with API call)


        setData({ ...data, ...formData });


        const response = await axios.put('/api/user/profileUpdate', formData);
        console.log(response);

        setIsOpen(false);
    };

    return (
        <>
            {/* CARD */}
            <div className="max-w-md mx-auto mt-10">
                <div className="bg-linear-to-br from-blue-900 to-black text-white rounded-2xl shadow-xl p-6">

                    <h2 className="text-xl font-semibold mb-4">Your Profile</h2>

                    <div className="flex items-center gap-4 mb-5">
                        <Image
                            src={data?.image}
                            alt='pfp'
                            width={60}
                            height={60}
                            className="rounded-full border-2 border-blue-400"
                        />
                        <h3 className="text-lg font-medium">{data?.username}</h3>
                    </div>

                    <div className="h-px bg-gray-700 mb-4" />

                    <div>
                        <h3 className="text-md font-semibold mb-2 text-blue-400">
                            Your Bio
                        </h3>
                        <p className="text-sm text-gray-300">{data?.bio}</p>
                    </div>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="mt-5 w-full bg-blue-600 hover:bg-blue-500 rounded-lg py-2 text-sm font-medium"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* MODAL WITH FORM */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-900 text-white p-6 rounded-2xl w-[90%] max-w-md shadow-lg"
                    >
                        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

                        {/* Username */}
                        <div className="mb-4">
                            <label className="text-sm text-gray-300">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Bio */}
                        <div className="mb-4">
                            <label className="text-sm text-gray-300">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={3}
                                className="w-full mt-1 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-sm bg-gray-700 rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-4 py-2 text-sm bg-blue-600 rounded-lg hover:bg-blue-500"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default ProfileCard