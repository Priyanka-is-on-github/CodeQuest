import Footer from "@/_components/Footer";
import Navbar from "@/_components/Navbar";
import { MenuIcon, XIcon } from "lucide-react"; // Added XIcon for close button
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="h-full">
      {/* header */}
      <header className="bg-gray-900 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo with hover effect */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
              onClick={closeMenu}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300 shadow-md">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-white">
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
                  <circle cx="8" cy="8" r="1" fill="currentColor" />
                  <circle cx="16" cy="8" r="1" fill="currentColor" />
                  <circle cx="8" cy="16" r="1" fill="currentColor" />
                  <circle cx="16" cy="16" r="1" fill="currentColor" />
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

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <Navbar onItemClick={closeMenu} />
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden focus:outline-none p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <Navbar onItemClick={closeMenu} isMobile={true} />
          </div>
        </div>
      </header>

      {/* main section - added padding-top to account for fixed header */}
      <main className="h-full pt-16 md:pt-20">{children}</main>

      {/* footer section */}
      <Footer />
    </div>
  );
}

export default Layout;