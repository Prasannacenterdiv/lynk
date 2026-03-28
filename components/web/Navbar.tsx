
"use client"

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation"
import { useState } from "react"


const Navbar = (session: Boolean = false) => {

  const [isSession, setSession] = useState(session);
  const handleLogout = async () => {
    await authClient.signOut();
    redirect('/');
  }
  return (

    <nav className="flex justify-between items-center px-5 py-2 min-w-full border-b border-b-gray-400">
      <div
        onClick={() => redirect('/')}
        className="text-xl font-bold cursor-pointer">
        <span>L</span>
        <span className="text-blue-500 italic">ynk</span>
      </div>
      {
        (isSession) ? <div className="flex gap-10 text-xl font-bold">
          <button
            onClick={() => redirect('/login')}
            className="cursor-pointer"
          >LogIn</button>
          <button
            className="cursor-pointer"
            onClick={() => redirect('/login')}
          >Register</button>
        </div> : <div>
          <button
            onClick={() => { handleLogout }}
            className="px-3 py-1 bg-red-500 rounded-lg text-sm"
          >Logout</button>
        </div>
      }
    </nav>
  )
}

export default Navbar