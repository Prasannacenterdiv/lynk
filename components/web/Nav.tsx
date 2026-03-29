"use client"
import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import React from 'react'

const Navbar =  () => {

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = "/";
                },
            },
        });
    };
    return (
        < nav className="flex items-center justify-between px-8 py-5 border-b border-white/5 " >
            <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-500 rounded-md flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M8 3l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <span className="text-lg font-semibold tracking-tight">Lynk</span>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => { handleLogout() }}
                    className="text-sm bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded-md font-medium">Logout</button>
            </div>
        </nav >
    )
}

export default Navbar