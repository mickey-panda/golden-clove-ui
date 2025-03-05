"use client";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";

const About = () => {
    const teamMembers = [
        { name: "Mrs. Geetanjali Panda", role: "Founder", image: "https://i.imgur.com/QUlo1l0.jpeg" },
        { name: "Mr. Nanda Kishore Panda", role: "Finance & Accounting", image: "https://i.imgur.com/PxilysS.jpeg" },
        { name: "Mrs. Sila Sabat", role: "Operations & Quality", image: "https://i.imgur.com/LTEbQkR.jpeg" },
        { name: "Mr. Prabina Kumar Panda", role: "Retails & Stores", image: "https://i.imgur.com/W2G1Wdj.jpeg" },
        { name: "Pradeepta Kumar Panda", role: "Tech & Marketing", image: "https://i.imgur.com/z24G02o.jpeg" },
        ];
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 overflow-x-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <Navbar />
      </div>

      <main className="flex-1 pt-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center py-16">
          <motion.h1 
            className="text-4xl font-bold text-yellow-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Golden Clove
          </motion.h1>
          <p className="mt-4 text-lg text-gray-700">
            Your trusted brand for pure, high-quality spices, sourced naturally for a healthier life.
          </p>
        </section>

        {/* Mission Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4 sm:px-6">
        <div>
            <h2 className="text-3xl font-semibold text-gray-900">Our Mission</h2>
            <p className="mt-4 text-gray-700">
            At Golden Clove, we aim to revolutionize the spice industry by providing 100% natural, 
            unadulterated, and chemical-free spices, ensuring a healthier and more flavorful experience for our customers.
            </p>
        </div>

        {/* Replacing Image with a Stats Block */}
        <div className="bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 p-6 rounded-lg shadow-lg text-center border border-yellow-600">
            <h3 className="text-xl font-semibold text-white drop-shadow-lg">Why Choose Us?</h3>
            <div className="mt-4 space-y-4">
                <p className="text-white font-medium drop-shadow-md"><strong>100%</strong> Natural & Pure Spices</p>
                <p className="text-white font-medium drop-shadow-md"><strong>0%</strong> Chemicals or Adulteration</p>
                <p className="text-white font-medium drop-shadow-md"><strong>5,000+</strong> Happy Customers</p>
                <p className="text-white font-medium drop-shadow-md"><strong>10+</strong> Years of Experience</p>
            </div>
        </div>

        </section>


        {/* Problem & Solution Section */}
        <section className="bg-gray-100 p-8 rounded-xl shadow-md mt-16">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">The Market Problem We Solve</h2>
          <p className="mt-4 text-gray-700 text-center">
            Many commercial spice brands use artificial colors, preservatives, and adulterants, 
            compromising the quality and health benefits of spices. Consumers struggle to find genuine, 
            unprocessed, and ethically sourced spices.
          </p>
          <h3 className="mt-6 text-2xl font-semibold text-center text-yellow-600">How Golden Clove Solves It</h3>
          <p className="mt-2 text-gray-700 text-center">
            We ensure that every spice is directly sourced from farmers, carefully processed, and packaged
            without any chemicals or additives, making your meals both tastier and healthier.
          </p>
        </section>

        {/* Team Section */}
        <section className="mt-16 px-6">
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
      <footer className="bg-gray-800 text-gray-400 text-center py-4 text-sm mt-12">
        © 2025 Golden Clove. All rights reserved.
      </footer>
    </div>
  );
};



export default About;
