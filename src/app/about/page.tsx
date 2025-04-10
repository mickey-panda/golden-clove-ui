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
        <section className="text-center py-16 bg-gray-50">
            <motion.h1
                className="text-3xl font-light text-gray-800 tracking-wide"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                Our Essence, Our Craft
            </motion.h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Golden Clove curates spices that whisper tradition and purity—elevating every dish with timeless flavor.
            </p>
        </section>

        {/* Mission Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 py-14 bg-white">
            <div>
                <h2 className="text-3xl font-light text-gray-800 tracking-wide">Our Purpose</h2>
                <p className="mt-4 text-base text-gray-600 max-w-md leading-relaxed">
                Golden Clove redefines purity in a world of compromise. We curate spices that honor tradition, 
                ensuring every pinch is natural, ethical, and vital to your well-being.
                </p>
            </div>

            {/* Stats Block */}
            <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6 rounded-xl shadow-sm text-center">
                <h3 className="text-xl font-medium text-gray-800">Why Golden Clove?</h3>
                <div className="mt-5 space-y-4">
                <p className="text-gray-700 text-base"><span className="font-semibold text-lg">100%</span> Pure Spices</p>
                <p className="text-gray-700 text-base"><span className="font-semibold text-lg">0%</span> Additives</p>
                <p className="text-gray-700 text-base"><span className="font-semibold text-lg">10,000+</span> Happy Customers</p>
                <p className="text-gray-700 text-base"><span className="font-semibold text-lg">12+</span> Years of Craft</p>
                </div>
            </div>
        </section>

        {/* Market Problem & Solution Section */}
        <section className="bg-gray-50 p-10 rounded-lg mt-12">
            <h2 className="text-3xl font-light text-center text-gray-800 tracking-wide">The Purity Divide</h2>
            <p className="mt-4 text-base text-center text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Many spices lose their essence to synthetic additives and adulteration, leaving flavor and purity behind.
            </p>

            {/* Solution Section */}
            <div className="mt-8 bg-white p-6 rounded-lg text-center">
                <h3 className="text-xl font-medium text-gray-800">Golden Clove’s Promise</h3>
                <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
                Sourced from farmers and tested for purity, our spices bring natural flavor to every dish—untouched by chemicals.
                </p>
            </div>
        </section>

        {/* Vision Section */}
        <section className="mt-12 bg-gray-50 py-12 text-center">
            <h2 className="text-3xl font-light text-gray-800 tracking-wide">Our Vision Unveiled</h2>
            <p className="mt-4 text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
                To bring pure, aromatic spices to every table—uncompromised and timeless.
            </p>
        </section>

        {/* Team Section */}
        <section className="mt-12 mb-6 px-4">
            <h2 className="text-2xl font-light text-center text-gray-800 tracking-wide">Our Artisans</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-6 place-items-center">
                {teamMembers.map((member, index) => (
                <motion.div
                    key={index}
                    className="bg-white p-4 rounded-lg text-center w-60"
                    whileHover={{ scale: 1.03 }}
                >
                    <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={140}
                    className="rounded-md mx-auto object-cover w-full h-36"
                    />
                    <h3 className="mt-2 text-base font-medium text-gray-800">{member.name}</h3>
                    <p className="text-gray-600 text-xs">{member.role}</p>
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
