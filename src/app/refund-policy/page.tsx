"use client";
import RefundPolicyComponent from "@/components/RefundPolicyComponent";
import Navbar from "../../components/Navbar";
import Footer from "@/components/Footer";

const  refund= () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 mt-12">
        <RefundPolicyComponent/>
      </main>

      {/* Footer - Fixed at Bottom */}
      <Footer/>
    </div>
  );
};

export default refund;
