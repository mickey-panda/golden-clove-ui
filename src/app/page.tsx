"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { FaSkullCrossbones, FaLeaf } from "react-icons/fa"; // Import icons
import CustomerReviewSection from "../components/CustomerReviewsSection";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
  const FIRST_IMAGE = { imageUrl: "/realcinnamon.png" };
  const SECOND_IMAGE = { imageUrl: "/fakecinnamon.png" };
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navbar section */}
      <Navbar/>
      
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen">
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
          <Link href="/products">
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
      <section className="relative flex flex-col items-center justify-center py-20 px-6">
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
        <div className="relative max-w-3xl w-full bg-gray-50 shadow-lg rounded-2xl p-6 glassmorphism">
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
      <section className="py-16 px-4">
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

      {/* Where to find real cinnamon section */}
      {/* <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Where to Find Real Ceylon Cinnamon?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            You might find Sri Lankan Ceylon Cinnamon on marketplaces like
            Flipkart and Amazon, but at ₹4 - ₹6 per gram, it’s overpriced!
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-6 md:flex items-center justify-between"
          >
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-yellow-700 mb-2">
                Why Pay More?
              </h3>
              <p className="text-gray-600">
                Get **100% pure, authentic Ceylon Cinnamon** from Golden Clove at
                just <span className="text-red-500 font-bold">₹2.35 per gram</span>!
              </p>
              <p className="text-green-600 font-semibold mt-2">
                ✅ Lower price, better quality, no middlemen!
              </p>
            </div>

            <div className="flex justify-center mt-4 md:mt-0">
              <Image
                src="/realcinnamon.png"
                width={250}
                height={150}
                alt="Ceylon Cinnamon vs Fake Cinnamon"
                className="rounded-lg"
              />
            </div>
          </motion.div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-red-100 p-4 rounded-lg shadow-md text-center"
            >
              <h3 className="text-lg font-semibold text-red-700">Amazon</h3>
              <p className="text-gray-700">₹5.50/g</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 p-4 rounded-lg shadow-md text-center"
            >
              <h3 className="text-lg font-semibold text-gray-700">Flipkart</h3>
              <p className="text-gray-700">₹4.75/g</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-green-100 p-4 rounded-lg shadow-md text-center"
            >
              <h3 className="text-lg font-semibold text-green-700">Golden Clove</h3>
              <p className="text-green-700 text-xl font-bold">₹2.35/g</p>
            </motion.div>
          </div>
        </div>
      </section> */}

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Why Overpay for Ceylon Cinnamon?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Many sellers on marketplaces like Flipkart and Amazon list Sri Lankan Ceylon Cinnamon at **₹4 - ₹6 per gram** (as of March 2025).  
            But why pay extra when you can get **100% pure, authentic Ceylon Cinnamon** at a much better price?
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-6 md:flex items-center justify-between"
          >
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-yellow-700 mb-2">
                Direct from Source, No Middlemen!
              </h3>
              <p className="text-gray-600">
                At <span className="text-red-500 font-bold">Golden Clove</span>, we bring **farm-fresh Ceylon Cinnamon**  
                straight to your doorstep—**without overpriced markups**.  
              </p>
              <p className="text-green-600 font-semibold mt-2">
                ✅ Better quality, fresher stock, and unbeatable price!
              </p>
              <p className="mt-2 text-gray-700">
                Why settle for ₹5.50/g when you can get it for just **₹2.35/g**?
              </p>
            </div>

            <div className="flex justify-center mt-4 md:mt-0">
              <Image
                src="/realcinnamon.png"
                width={250}
                height={150}
                alt="Ceylon Cinnamon vs Fake Cinnamon"
                className="rounded-lg"
              />
            </div>
          </motion.div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-red-100 p-4 rounded-lg shadow-md text-center"
            >
              <h3 className="text-lg font-semibold text-red-700">Amazon</h3>
              <p className="text-gray-700">₹5.50/g <span className="text-xs">(as of March 2025)</span></p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 p-4 rounded-lg shadow-md text-center"
            >
              <h3 className="text-lg font-semibold text-gray-700">Flipkart</h3>
              <p className="text-gray-700">₹4.75/g <span className="text-xs">(as of March 2025)</span></p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-green-100 p-4 rounded-lg shadow-md text-center"
            >
              <h3 className="text-lg font-semibold text-green-700">Golden Clove</h3>
              <p className="text-green-700 text-xl font-bold">₹2.35/g</p>
            </motion.div>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            *Prices based on marketplace listings as of March 2025 and may vary.
          </p>
        </div>
      </section>


      {/* customer review section */}
      <CustomerReviewSection />

      {/* Call-to-Action Button */}
      <section className="flex flex-col items-center justify-center py-16 px-4 bg-white">
        
        <motion.a
          href="/products"
          className="mt-6 px-8 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Buy 100% Real Cinnamon
        </motion.a>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

