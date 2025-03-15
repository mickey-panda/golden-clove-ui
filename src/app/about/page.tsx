"use client";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import teamMembers from "../../data/teamMembers";
// import ComparisonTable from "@/components/ComparisonTable";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 overflow-x-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <Navbar />
      </div>

      <main className="flex-1 pt-16 px-4 sm:px-6 lg:px-8">
        <section className="text-center py-20">
            <motion.h1
            className="text-5xl font-extrabold text-yellow-700 drop-shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            >
            Our Story, Our Promise
            </motion.h1>
            <p className="mt-5 text-xl text-gray-700 max-w-3xl mx-auto">
            At Golden Clove, we don’t just sell spices—we bring **authentic flavors** to your kitchen. 
            Every spice tells a story of purity, tradition, and commitment to quality.
            </p>
        </section>

        {/* Mission Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-8 py-16">
            <div>
            <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-5 text-lg text-gray-700 leading-relaxed">
                In an era where food is often compromised, Golden Clove stands as a symbol of **authenticity**. 
                We are on a mission to **revolutionize the spice industry**—one where consumers no longer 
                have to question the purity of their ingredients.  
                <br /><br />
                Our commitment? **100% natural, chemical-free, and ethically sourced spices** that don’t just enhance 
                taste but also **preserve health**.
            </p>
            </div>

            {/* Stats Block with a Modern Look */}
            <div className="bg-gradient-to-br from-yellow-400 via-yellow-600 to-yellow-800 p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-white drop-shadow-lg">Why Choose Golden Clove?</h3>
            <div className="mt-6 space-y-5">
                <p className="text-white text-lg font-medium"><strong className="text-2xl">100%</strong> Natural & Pure Spices</p>
                <p className="text-white text-lg font-medium"><strong className="text-2xl">0%</strong> Artificial Colors & Additives</p>
                <p className="text-white text-lg font-medium"><strong className="text-2xl">10,000+</strong> Satisfied Customers</p>
                <p className="text-white text-lg font-medium"><strong className="text-2xl">12+</strong> Years of Expertise in Spices</p>
            </div>
            </div>
        </section>

        {/* Market Problem & Solution Section */}
        <section className="bg-gray-100 p-12 rounded-xl shadow-md mt-16">
            <h2 className="text-4xl font-semibold text-center text-gray-900">The Market Challenge</h2>
            <p className="mt-5 text-lg text-center text-gray-700 leading-relaxed">
            Many commercial spice brands **compromise quality** by using **synthetic colors, preservatives, and 
            adulterants**. Consumers unknowingly buy spices that have lost their **true aroma, nutrients, and purity**.
            </p>

            {/* Solution Section */}
            <div className="mt-12 bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-3xl font-semibold text-yellow-700">Golden Clove: The Purity You Deserve</h3>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                Our spices are **sourced directly from farmers**, undergo **rigorous purity checks**, and are packaged 
                without any chemicals or additives.  
                <br /><br />
                Every pinch of Golden Clove’s spice **elevates the taste of your meals naturally**—the way it should be.
            </p>
            </div>
        </section>

        {/* Market Problem & Solution Section */}
        {/* <ComparisonTable/> */}

        {/* Vision Section */}
        <section className="mt-20 bg-yellow-600 text-white py-16 text-center">
            <h2 className="text-4xl font-bold">Our Vision</h2>
            <p className="mt-5 text-lg max-w-3xl mx-auto leading-relaxed">
            To redefine how the world experiences spices—ensuring that every home has access to **pure, aromatic, and 
            nutrient-rich** ingredients, without compromise.
            </p>
        </section>

        {/* Team Section */}
        <section className="mt-16 mb-8 px-6">
            <h2 className="text-3xl font-semibold text-center text-gray-900">Meet Our Team</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8 place-items-center">
                {teamMembers.map((member, index) => (
                <motion.div 
                    key={index} 
                    className="bg-white/90 backdrop-blur-lg p-4 rounded-xl shadow-lg text-center w-64 border border-gray-200 hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                >
                    <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={250} 
                    height={160} 
                    className="rounded-lg mx-auto object-cover shadow-md w-full h-40" 
                    />
                    <h3 className="mt-3 text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                </motion.div>
                ))}
            </div>
        </section>


      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
};



export default About;
