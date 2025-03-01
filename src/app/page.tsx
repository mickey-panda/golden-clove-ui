"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { FaSkullCrossbones, FaLeaf } from "react-icons/fa"; // Import icons
import customerReviews from "../data/customerReviews";
import CustomerReviewSection from "../components/CustomerReviewsSection";

export default function Home() {
  const FIRST_IMAGE = { imageUrl: "/realcinnamon.png" };
  const SECOND_IMAGE = { imageUrl: "/fakecinnamon.png" };
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/realcinnamon.png')" }}>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold drop-shadow-lg animate-fade-in">
            Golden Clove - <span className="text-yellow-400">100% Pure Spices</span>
          </h1>
          <p className="text-lg mt-4 opacity-90 leading-relaxed">
            Authentic, Lab-Tested, and G.I. Tagged Spices for the Purest Flavor & Health Benefits.
          </p>

          {/* Call-to-Action Button */}
          <Link href="/shop">
            <button className="mt-6 px-8 py-4 text-lg font-semibold bg-yellow-500 text-white rounded-full shadow-md transition-transform transform hover:scale-105 hover:bg-yellow-600">
              🛍️ Shop Now
            </button>
          </Link>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <p className="w-full text-center text-white text-lg mb-2 opacity-80 leading-relaxed animate-fade-in">
          Scroll down to know more about &quot;Cinnamon&quot;
        </p>
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Cinnamon Facts Table */}
      <section className="py-16 px-4">
        <div className="overflow-x-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">How to Identify Real vs. Fake Cinnamon?</h2>
            <table className="w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
              <thead className="bg-yellow-500 text-white text-lg">
                <tr>
                  <th className="p-4 text-center">Feature</th>
                  <th className="p-4 text-center">Real Cinnamon</th>
                  <th className="p-4 text-center">Fake Cinnamon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-gray-50 text-gray-800">
                <tr className="hover:bg-yellow-100 transition duration-300">
                  <td className="p-4 text-center font-medium">Texture</td>
                  <td className="p-4 text-center">Thin, soft, easy to break</td>
                  <td className="p-4 text-center">Thick, hard, rough</td>
                </tr>
                <tr className="hover:bg-yellow-100 transition duration-300">
                  <td className="p-4 text-center font-medium">Roll Structure</td>
                  <td className="p-4 text-center">Multiple layers like a cigar</td>
                  <td className="p-4 text-center">Single-layered, thick rolls</td>
                </tr>
                <tr className="hover:bg-yellow-100 transition duration-300">
                  <td className="p-4 text-center font-medium">Smell</td>
                  <td className="p-4 text-center">Sweet, delicate</td>
                  <td className="p-4 text-center">Strong, slightly bitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* Cinnamon slider */}
      <section className="relative flex flex-col items-center justify-center py-20 px-6 bg-gray-50">
        {/* Heading with Animation */}
        <motion.h2
          className="text-4xl font-bold text-gray-900 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Swipe to see fake and real Cinnamon structures
        </motion.h2>

        {/* Interactive Slider Section */}
        <div className="relative max-w-3xl w-full bg-white shadow-lg rounded-2xl p-6 glassmorphism">
          <ReactBeforeSliderComponent
            firstImage={FIRST_IMAGE}
            secondImage={SECOND_IMAGE}
            currentPercentPosition={sliderPosition}
            onChangePercentPosition={setSliderPosition}
          />

          {/* Label Overlays - Visibility Controlled by Slider Position */}
          <div
            className={`absolute top-1/2 left-6 text-white text-xl font-bold bg-red-600 px-4 py-2 rounded-lg shadow-md transition-opacity duration-300 ${
              sliderPosition > 90 ? "opacity-100" : "opacity-0"
            }`}
          >
            Fake Cinnamon
          </div>

          <div
            className={`absolute top-1/2 right-6 text-white text-xl font-bold bg-green-600 px-4 py-2 rounded-lg shadow-md transition-opacity duration-300 ${
              sliderPosition < 10 ? "opacity-100" : "opacity-0"
            }`}
          >
            Real Cinnamon
          </div>
        </div>
      </section>


      {/* Harmful Effects & Benefits Section */}
      <section className="py-16 px-4 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-6">Why Choose Real Cinnamon?</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Harmful Effects of Fake Cinnamon */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-red-100 p-6 rounded-lg shadow-md border border-red-300"
          >
            <div className="flex items-center space-x-4">
              <FaSkullCrossbones className="text-red-600 text-4xl" />
              <h3 className="text-2xl font-semibold text-red-700">
                Harmful Effects of Fake Cinnamon
              </h3>
            </div>
            <ul className="mt-4 text-gray-700 list-disc pl-6">
              <li>Liver Damage – Coumarin in Cassia can lead to liver failure.</li>
              <li>Blood Thinning – Can cause internal bleeding.</li>
              <li>Cancer Risk – Long-term consumption may increase tumor risks.</li>
              <li>Digestive Issues – Can cause bloating and nausea.</li>
            </ul>
          </motion.div>

          {/* Benefits of Real Cinnamon */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-100 p-6 rounded-lg shadow-md border border-green-300"
          >
            <div className="flex items-center space-x-4">
              <FaLeaf className="text-green-600 text-4xl" />
              <h3 className="text-2xl font-semibold text-green-700">
                Benefits of Real Cinnamon
              </h3>
            </div>
            <ul className="mt-4 text-gray-700 list-disc pl-6">
              <li>Low in Coumarin – Safe for daily use.</li>
              <li>Rich in Antioxidants – Boosts immunity.</li>
              <li>Controls Blood Sugar – Supports diabetes management.</li>
              <li>Enhances Brain Function – Improves memory.</li>
              <li>Aromatic & Sweet – No harsh bitterness like Cassia.</li>
            </ul>
          </motion.div>

        </div>
      </section>

      {/* customer review section */}
      <CustomerReviewSection />
      <section className="flex flex-col items-center justify-center py-16 px-4 bg-white">
        

        {/* Call-to-Action Button */}
        <motion.a
          href="/shop"
          className="mt-6 px-8 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Buy 100% Real Cinnamon
        </motion.a>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-800 text-white">
        <p>&copy; 2025 Golden Clove. All rights reserved.</p>
      </footer>
    </div>
  );
}
