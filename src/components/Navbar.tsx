"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="text-2xl font-bold text-yellow-500 cursor-pointer tracking-wide"
            whileHover={{ scale: 1.05 }}
          >
            Golden Clove
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 font-medium">
          <NavItem href="/shop" label="Shop" />
          <NavItem href="/blogs" label="Blogs" />
          <NavItem href="/contact" label="Contact Us" />
          <NavItem href="/about" label="About Us" />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-black shadow-lg absolute top-full left-0 w-full flex flex-col items-center py-4 space-y-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <NavItem href="/shop" label="Shop" onClick={() => setIsOpen(false)} />
          <NavItem href="/blogs" label="Blogs" onClick={() => setIsOpen(false)} />
          <NavItem href="/contact" label="Contact Us" onClick={() => setIsOpen(false)} />
          <NavItem href="/about" label="About Us" onClick={() => setIsOpen(false)} />
        </motion.div>
      )}
    </nav>
  );
}

const NavItem = ({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="text-white text-lg tracking-wide cursor-pointer transition hover:text-yellow-500"
  >
    <Link href={href} onClick={onClick}>
      {label}
    </Link>
  </motion.div>
);
