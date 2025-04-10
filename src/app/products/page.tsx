"use client";
import Footer from "@/components/Footer";
import Navbar from "../../components/Navbar";
import ProductsComponent from "../../components/ProductsComponent";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { createCart, getCart } from "@/dbActions/cart-actions";

export default function Shop(){
    const {user} = useAuth();
    useEffect(()=>{
        let isMounted = true;
        if(user){
            getCart(user.uid)
            .then((result)=>{
                if(result || !isMounted){
                    return;
                }
                
                createCart(user.uid)
                .then((value)=>console.log(value.cartId))
                .catch((error)=>console.log(error));
                    
            })
            .catch((error)=>console.log(error));
        }
        return () => {
            isMounted = false; // Prevent duplicate API calls on re-renders
        };
    },[user?.uid]);

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
}