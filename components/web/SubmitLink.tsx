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

    // Modal state
    const [open, setOpen] = useState(false);

    // Form state
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

    // ✅ Add Link
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

    // ✅ Delete Link
    const handleDelete = async (id: string) => {
        const confirmDelete = confirm("Are you sure you want to delete this link?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`/api/links/${id}`);

            // update UI instantly
            setLinks((prev) => prev.filter((link) => link._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <>
            {/* Add Button */}
            <button
                onClick={() => setOpen(true)}
                className="mb-6 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
                Add a Link 🔗
            </button>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                    <div className="bg-linear-to-br from-blue-900 to-black p-6 rounded-2xl w-full max-w-md border border-blue-800 shadow-xl">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Add New Link
                        </h2>

                        {/* Title */}
                        <input
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mb-3 p-2 rounded-lg bg-black/50 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                        />

                        {/* URL */}
                        <input
                            type="text"
                            placeholder="Enter URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full mb-4 p-2 rounded-lg bg-black/50 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                        />

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmitLink}
                                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Links Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {links.map((link) => (
                    <div
                        key={link._id}
                        className="group bg-linear-to-br from-blue-900/60 to-black border border-blue-800/40 rounded-2xl p-5 shadow-lg hover:shadow-blue-900/40 transition-all duration-300 hover:-translate-y-1"
                    >
                        <h2 className="text-lg font-semibold text-white mb-2 truncate">
                            {link.title}
                        </h2>

                        <p className="text-sm text-gray-400 truncate mb-4">
                            {link.url}
                        </p>

                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2 rounded-lg transition-all duration-200"
                        >
                            Open Link →
                        </a>

                        {/* Actions */}
                        <div className="flex justify-between items-center mt-3">
                            <button
                                onClick={() => handleDelete(link._id)}
                                className="text-xs text-red-400 hover:text-red-300"
                            >
                                🗑 Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SubmitLink;