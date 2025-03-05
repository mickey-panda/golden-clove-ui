"use client";
import Navbar from "../../components/Navbar";
import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const contact = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <section className="pt-24 text-center">
            <motion.h1 
                className="text-4xl font-bold text-yellow-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Contact Us
            </motion.h1>
            <p className="text-lg mt-4">We are here to assist you. Reach out to us anytime!</p>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Head Office */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-semibold text-yellow-500 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Lochhapada Main Road Store, Berhampur
            </h2>
            <p className="mt-2">Lochhapada Main Road, Near Dhobanala Bridge, infront of Dream Light Play School.</p>
            <a
                href="https://maps.app.goo.gl/QhqBvciqopMjL1vt6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 w-fit"
                >
                <FaMapMarkerAlt className="text-lg" />
                <span>Find Us on Google Maps</span>
            </a>
            <div className="mt-4 space-y-2">
                {/* Clickable phone numbers */}
                <a href="tel:+918658276477" className="flex items-center hover:text-yellow-600">
                    <FaPhoneAlt className="mr-2 text-yellow-500" /> +91 8658276477
                </a>
                <a href="tel:+917381400960" className="flex items-center hover:text-yellow-600">
                    <FaPhoneAlt className="mr-2 text-yellow-500" /> +91 7381400960
                </a>

                {/* Clickable WhatsApp number */}
                <a href="https://wa.me/918658276477" target="_blank" className="flex items-center hover:text-green-600">
                    <FaWhatsapp className="mr-2 text-green-500" /> +91 8658276477
                </a>
            </div>
          </motion.div>

          {/* Branch Office */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-semibold text-yellow-500 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Sidhartha Nagar Store, Berhampur
            </h2>
            <p className="mt-2">House number 20, Sidhartha Nagar 2nd Lane</p>
            <a
                href="https://maps.app.goo.gl/mm8WBC3jzpFJRrcN7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 w-fit"
                >
                <FaMapMarkerAlt className="text-lg" />
                <span>Find Us on Google Maps</span>
            </a>
            <div className="mt-4 space-y-2">
                {/* Clickable phone numbers */}
                <a href="tel:+918658276477" className="flex items-center hover:text-yellow-600">
                    <FaPhoneAlt className="mr-2 text-yellow-500" /> +91 8658276477
                </a>
                <a href="tel:+917381400960" className="flex items-center hover:text-yellow-600">
                    <FaPhoneAlt className="mr-2 text-yellow-500" /> +91 7381400960
                </a>

                {/* Clickable WhatsApp number */}
                <a href="https://wa.me/918658276477" target="_blank" className="flex items-center hover:text-green-600">
                    <FaWhatsapp className="mr-2 text-green-500" /> +91 8658276477
                </a>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer - Fixed at Bottom */}
      <footer className="bg-gray-800 text-gray-400 text-center py-4 text-sm">
        © 2025 Golden Clove. All rights reserved.
      </footer>
    </div>
  );
};

export default contact;
