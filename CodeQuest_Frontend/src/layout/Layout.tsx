import Footer from "@/_components/Footer";
import Navbar from "@/_components/Navbar";
import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { Link } from "react-router-dom";

function Layout({ children }: { children: React.ReactNode }) {

 

 
  return (
    <div className="h-full">
      {/* header */}

     <header className="bg-gray-900 text-white shadow-lg  fixed top-0 left-0 right-0 z-50">
    <div className="container mx-auto px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo with hover effect */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300 shadow-md">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-white">
              {/* Chip-like design representing computing */}
              <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              {/* Binary-inspired dots */}
              <circle cx="8" cy="8" r="1" fill="currentColor" />
              <circle cx="16" cy="8" r="1" fill="currentColor" />
              <circle cx="8" cy="16" r="1" fill="currentColor" />
              <circle cx="16" cy="16" r="1" fill="currentColor" />
              {/* Central processor symbol */}
              <path
                d="M12 10L14 12L12 14L10 12L12 10Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
            CodeQuest
          </span>
        </Link>

        {/* Navigation Links */}
        <Navbar  />

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>

      {/* main section */}

      <main className=" h-full">{children}</main>


      {/* footer section */}

      <Footer/>
    </div>
  );
}

export default Layout;
