"use client";

import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const comparisonData = [
  {
    problem: "Adulteration & Chemicals",
    market: "Many brands mix starch, artificial colors, or preservatives.",
    solution: "100% pure, natural spices – No chemicals, no artificial colors, no preservatives.",
  },
  {
    problem: "Fake or Low-Quality Raw Spices",
    market: "Brands buy in bulk, often mixing old & new stock.",
    solution: "Sourced directly from farmers, ensuring the freshest quality.",
  },
  {
    problem: "Loss of Natural Oils & Aroma",
    market: "Over-processed spices lose their natural essential oils.",
    solution: "Premium low-heat processing retains natural oils and aroma.",
  },
  {
    problem: "Misleading 'Organic' Labels",
    market: "Many claim organic but may still have pesticides.",
    solution: "Lab-tested, truly organic & chemical-free spices.",
  },
  {
    problem: "High Prices Without Added Value",
    market: "Big brands charge extra for marketing & packaging.",
    solution: "Fair pricing – No unnecessary markups, just premium quality.",
  },
  {
    problem: "Extremely Cheap Spices (Compromised Quality)",
    market: "Some sellers offer very cheap spices that are often adulterated.",
    solution: "Affordable yet high-quality – Direct farmer pricing ensures value for money.",
  },
  {
    problem: "Non-Transparent Sourcing",
    market: "Most brands don’t disclose the origin of their spices.",
    solution: "Clear labeling – Each spice’s origin is fully disclosed.",
  },
  {
    problem: "Poor Packaging & Storage",
    market: "Thin plastic packaging that doesn’t lock in freshness.",
    solution: "Premium air-tight, eco-friendly packaging to maintain freshness.",
  },
];

const ComparisonTable = () => {
  return (
    <section className="py-16 px-4 sm:px-8 bg-gray-100">
      {/* Header Section */}
      <motion.h2 
        className="text-3xl font-bold text-center text-yellow-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Market Problems vs. Golden Clove’s Solution
      </motion.h2>

      {/* Table Container */}
      <div className="overflow-x-auto mt-8">
        <table className="w-full border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
            <thead>
            <tr className="bg-yellow-600 text-white">
                <th className="p-4 w-1/3 text-left">Problem</th>
                <th className="p-4 w-1/3 text-left">Big Brands & Local Stores</th>
                <th className="p-4 w-1/3 text-left">Golden Clove’s Solution</th>
            </tr>
            </thead>
            <tbody>
            {comparisonData.map((row, index) => (
                <tr key={index} className={`border-b border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}>
                    {/* Problem Column */}
                    <td className="p-4 font-semibold text-gray-900">{row.problem}</td>

                    {/* Big Brands & Local Stores Column */}
                    <td className="p-4 flex items-center text-red-800">
                        <FaTimesCircle className="mr-2 text-red-600" />
                        <span>{row.market}</span>
                    </td>

                    {/* Golden Clove’s Solution Column */}
                    <td className="p-4 flex items-center text-green-900">
                        <FaCheckCircle className="mr-2 text-green-700" />
                        <span>{row.solution}</span>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </section>
  );
};

export default ComparisonTable;
