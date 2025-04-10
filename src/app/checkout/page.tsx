"use client";
import CheckoutComponent from "@/components/CheckoutComponent";
import Navbar from "../../components/Navbar";

const Checkout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 overflow-x-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <Navbar />
      </div>

      <main className="flex-1 pt-16 px-4 sm:px-6 lg:px-8">
        <CheckoutComponent/>
      </main>
    </div>
  );
};



export default Checkout;