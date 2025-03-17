"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {user}=useAuth();

  const handleLogout = async () => {
    await signOut(auth).then(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo */}
        <Link href="/">
          <motion.div className="text-2xl font-bold text-yellow-500 cursor-pointer tracking-wide" whileHover={{ scale: 1.05 }}>
            Golden Clove
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 font-medium ml-auto mr-8">
          <NavItem href="/products" label="Products" />
          <NavItem href="/contact" label="Contact Us" />
          <NavItem href="/about" label="About Us" />
        </div>

        {/* Profile Section */}
        <div className="relative flex items-center">
          {user ? (
            <div
              className="relative flex items-center space-x-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-10 h-10 bg-gray-300 text-black flex items-center justify-center rounded-full text-lg font-semibold overflow-hidden border-2 border-yellow-500">
                {user.photoURL ? (
                  <Image src={user?.photoURL} alt="User Profile" className="w-full h-full object-cover" />
                ) : (
                  user.displayName?.charAt(0).toUpperCase() || "U"
                )}
              </div>
              <span className="text-white font-medium hidden md:block">
                {user.displayName?.split(" ")[0] || "User"}
              </span>
            </div>
          ) : (
            <Link href="/login">
              <button className="border border-yellow-500 text-yellow-500 px-4 py-1.5 rounded-md font-medium backdrop-blur-md bg-opacity-10 hover:bg-yellow-500 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105">
                Login
              </button>
            </Link>
          )}

          {/* Fixed Dropdown Menu */}
          {dropdownOpen && user && (
            <motion.div
              className="absolute right-0 top-full mt-2 w-56 bg-white text-black shadow-lg rounded-lg overflow-hidden border border-gray-200 z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/profile" className="block px-4 py-3 hover:bg-gray-100">
                Profile
              </Link>
              <Link href="/cart" className="block px-4 py-3 hover:bg-gray-100">
                Cart
              </Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-3 hover:bg-gray-100">
                Logout
              </button>
            </motion.div>
          )}
        </div>

        
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div className="md:hidden bg-black shadow-lg absolute top-full left-0 w-full flex flex-col items-center py-4 space-y-4"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <NavItem href="/products" label="Products" onClick={() => setIsOpen(false)} />
          <NavItem href="/contact" label="Contact Us" onClick={() => setIsOpen(false)} />
          <NavItem href="/about" label="About Us" onClick={() => setIsOpen(false)} />
        </motion.div>
      )}

    </nav>
  );
}

const NavItem = ({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) => (
  <motion.div whileHover={{ scale: 1.1 }} className="text-white text-lg tracking-wide cursor-pointer transition hover:text-yellow-500">
    <Link href={href} onClick={onClick}>{label}</Link>
  </motion.div>
);
