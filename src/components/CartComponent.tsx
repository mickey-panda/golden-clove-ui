"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { FaTrash, FaShoppingCart, FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

const CartComponent = () => {
  const upiId = "pradeeptakumar3@ybl"; // Replace with your UPI ID
  const { cart, addToCart, reduceFromCart, removeFromCart, clearCart } = useCart();

  // Calculate total price
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharge = subtotal > 500 ? 0 : 40; // Free delivery above ₹500
  const total = subtotal + deliveryCharge;
  const upiUrl = `upi://pay?pa=${upiId}&pn=Golden Clove&mc=&tid=&tr=${Date.now()}&tn=Spice Purchase&am=${total}&cu=INR`;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <FaShoppingCart size={80} className="text-gray-300 mb-4" />
        <p className="text-xl font-semibold text-gray-600">Your cart is empty.</p>
        <Link href="/products">
          <button className="mt-4 px-6 py-3 bg-yellow-500 text-white rounded-xl shadow-lg hover:bg-yellow-600 transition-all">
            Browse Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
      {/* Cart Items Section */}
      <div className="w-full md:w-2/3 bg-white p-6 rounded-2xl shadow-xl overflow-hidden">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Shopping Cart</h2>
        <div className="space-y-6 overflow-y-auto max-h-[60vh]">
          {cart.map((item) => (
            <motion.div
              key={`${item.id}-${item.size}`}
              className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md transition-all hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-lg border" />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">Size: <span className="font-medium">{item.size}</span></p>
                <p className="text-md font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => reduceFromCart(item.id, item.size)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-l-lg hover:bg-gray-400 transition-all"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 border text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-r-lg hover:bg-gray-400 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id, item.size)} className="text-red-500 ml-4 hover:text-red-700">
                <FaTrash size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Checkout Section */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-xl">
        <h3 className="text-xl font-semibold border-b pb-2 mb-4">Order Summary</h3>
        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span className="font-medium">{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mt-3">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <button
            onClick={clearCart}
            className="w-full border-2 border-orange-500 text-orange-500 py-3 rounded-xl shadow-lg hover:bg-orange-500 hover:text-white transition-all"
            >
            Clear Cart
          </button>

          <button
            onClick={() => alert("Payment Integration Coming Soon!")}
            className="w-full flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 backdrop-blur-md border border-green-400"
            >
            <FaCreditCard className="mr-2 text-lg" /> Pay ₹{total.toFixed(2)}
          </button>
          <div className="flex flex-col items-center">
            <QRCodeSVG value={upiUrl} size={200} />
            <p className="text-gray-600 mt-2">Scan to Pay via PhonePe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
