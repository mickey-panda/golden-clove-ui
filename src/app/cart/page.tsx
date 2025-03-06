"use client";
import CartComponent from "@/components/CartComponent";
import Navbar from "../../components/Navbar";

const cart = () =>{
    return(
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50" >
                <Navbar />
            </div>
            
    
            <main className="flex-1 pt-16"> {/* Adjust 'pt-16' based on Navbar height */}
                <CartComponent/>
            </main>
    
            {/* Footer - Fixed at Bottom */}
            <footer className="bg-gray-800 text-gray-400 text-center py-4 text-sm">
                © 2025 Golden Clove. All rights reserved.
            </footer>
    </div>
    );
};

export default cart;