"use client";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 text-center py-6 text-sm w-full">
            <div className="container mx-auto px-4 max-w-screen-lg">
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 w-full">
                    {/* Footer Links */}
                    <div className="flex flex-wrap justify-center space-x-4">
                        <Link href="/terms-and-conditions" className="hover:text-white transition">
                            Terms & Conditions
                        </Link>
                        <Link href="/refund-policy" className="hover:text-white transition">
                            Refund Policy
                        </Link>
                        <Link href="/privacy-policy" className="hover:text-white transition">
                            Privacy Policy
                        </Link>
                        <Link href="/about" className="hover:text-white transition">
                            About Us
                        </Link>
                        <Link href="/contact" className="hover:text-white transition">
                            Contact Us
                        </Link>
                    </div>

                    {/* Copyright */}
                    <p className="text-gray-500">&copy; {new Date().getFullYear()} Golden Clove. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
