"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type LinkType = {
    _id: string;
    title: string;
    url: string;
};

const SubmitLink = () => {
    const [links, setLinks] = useState<LinkType[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    const getAllLinks = async () => {
        const response = await axios.get<{ linkData: LinkType[] }>("/api/links");
        setLinks(response.data.linkData);
        setLoading(false);
    };

    useEffect(() => {
        getAllLinks();
    }, []);

    const handleSubmitLink = async () => {
        try {
            const res = await axios.post("/api/links", { title, url });
            setLinks((prev) => [...prev, res.data.data]);
            setTitle("");
            setUrl("");
            setOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = confirm("Are you sure you want to delete this link?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`/api/links/${id}`);
            setLinks((prev) => prev.filter((link) => link._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading)
        return (
            <div className="flex items-center justify-center h-full text-white/60 text-sm">
                Loading your links...
            </div>
        );

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white/80">All Links</h2>
                <button
                    onClick={() => setOpen(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg shadow-md shadow-blue-900/30"
                >
                    + Add Link
                </button>
            </div>

            {links.length === 0 && (
                <div className="flex-1 flex items-center justify-center text-white/50 text-sm border border-white/10 rounded-xl bg-black/20">
                    No links added yet
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {links.map((link) => (
                    <div
                        key={link._id}
                        className="group bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-900/30 transition"
                    >
                        <h2 className="text-base font-semibold text-white mb-1 truncate">
                            {link.title}
                        </h2>

                        <p className="text-xs text-white/50 truncate mb-4">
                            {link.url}
                        </p>

                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2 rounded-lg"
                        >
                            Open Link
                        </a>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => handleDelete(link._id)}
                                className="flex items-center gap-1 text-sm font-medium
                                cursor-pointer px-3 py-1.5 rounded-md border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition "
                            >
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
                    <div className="w-full max-w-md bg-linear-to-br from-blue-950 to-black border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <h2 className="text-xl font-semibold text-white mb-5">
                            Add New Link
                        </h2>

                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500"
                            />

                            <input
                                type="text"
                                placeholder="https://example.com"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 text-white"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmitLink}
                                className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/30"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubmitLink;