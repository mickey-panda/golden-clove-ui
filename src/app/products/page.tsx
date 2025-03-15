"use client";
import Footer from "@/components/Footer";
import Navbar from "../../components/Navbar";
import ProductsComponent from "../../components/ProductsComponent";

const shop = () =>{
    return(
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                <Navbar />
            </div>
            
    
            <main className="flex-1 pt-16"> {/* Adjust 'pt-16' based on Navbar height */}
                <ProductsComponent />
            </main>
    
            {/*Footer - Fixed at Bottom */}
            <Footer/>
    </div>
    );
};

export default shop;