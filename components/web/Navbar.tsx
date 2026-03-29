"use client"
import { redirect } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  return (
    < nav className="flex items-center justify-between px-8 py-5 border-b border-white/10 " >
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
          onClick={() => redirect('/login')}
          className="text-sm text-white/60 hover:text-white px-3 py-1.5">Sign in</button>
        <button 
        onClick={()=>redirect('/dashboard')}
        className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md font-medium">Get started</button>
      </div>
    </nav >
  )
}

export default Navbar