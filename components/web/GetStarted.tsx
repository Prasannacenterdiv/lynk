'use client'

import { redirect } from "next/navigation"

const GetStarted = () => {
    return (
        <div>
            <button
                onClick={() => {
                    redirect('/dashboard')
                }}
                className="w-full border border-white/10 hover:border-white/20 hover:text-white text-lg px-3 py-1 bg-blue-700 text-white font-medium rounded-lg cursor-pointer">
                Get started free
            </button>
        </div>
    )
}

export default GetStarted