"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { FaTrash, FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthProvider";
import { useEffect,useState } from "react";
import { createCart, getCart } from "@/dbActions/cart-actions";
import { clearCart, getCartItems, increaseCartItem, reduceCartItem, removeCartItem } from "@/dbActions/cartItems-actions";
import { useNotification } from "@/contexts/NotificationProvider";
import CheckoutComponent from "./CheckoutComponent";

interface CartItem {
  cartId: number;
  cartItemId : number;
  productId: number;
  selectedSize: string;
  quantity: number;
  pricePerUnit: number; // Ensure it's a number
  totalPrice: number;
  productImage : string;
  productName : string;
}

const CartComponent = () => {

  const {user} = useAuth();
  const [cartId, setCartId] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  const [cartTotal, setCartTotal] = useState<number|0>(0);
  const { cart} = useCart();
  const {addNotification} = useNotification();

  // Calculate total price
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharge = subtotal > 500 ? 0 : 40; // Free delivery above ₹500
  const total = cartTotal + deliveryCharge;   
  // useEffect without cartItems dependency to avoid infinite loop
  useEffect(() => {
    getCurrentCartItems();
  }, [user,cartId]); // Runs when `user` changes, not on every cartItems update
  
  const getCurrentCartItems = async () => {
    try {
      if (user) {
        setIsLoading(true);
        // Fetch or create cart for user
        let cartData = await getCart(user.uid);
        if (!cartData) {
          cartData = await createCart(user.uid);
        }
        const cartId = cartData.cartId;
        setCartId(cartId);
  
        // Fetch cart items
        const items = await getCartItems(cartId);
        setCartItems(items);

        //set current cart value
        const totalPrice = items?.reduce((sum, item) => sum + item.totalPrice, 0);
        setCartTotal(totalPrice!);

        console.log(items);
      }
    } catch (error) {
      console.error("cart page ->", error);
    }
    finally{
      setIsLoading(false);
    }
  };
  
  const increaseCartItemQuantity = async (cartItem : CartItem) => {
    try {
      setIsUpdatingCart(true);
      await increaseCartItem({
        cartId : cartItem.cartId,
        productId : cartItem.productId,
        quantity : 1,
        pricePerUnit : cartItem.pricePerUnit,
        selectedSize : cartItem.selectedSize,
        totalPrice : cartItem.pricePerUnit * 1
      });

      //in frontend update the cart item quantity and total price also the cart value
      setCartItems(prevItems =>{
        const updatedItems = prevItems?.map(item =>
          item.cartItemId === cartItem.cartItemId
            ? { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + item.pricePerUnit }
            : item
        )
        //set cart total again
        const totalPrice = updatedItems?.reduce((sum, item) => sum + item.totalPrice, 0);
        setCartTotal(totalPrice!);
        return updatedItems;
      });

      
    } catch (error) {
      console.log(error);
    }finally{
      setIsUpdatingCart(false);
    }
  };

  const reduceCartItemQuanity = async (cartItem : CartItem) => {
    try {
      setIsUpdatingCart(true);
      await reduceCartItem({
        cartId : cartItem.cartId,
        productId : cartItem.productId,
        quantity : 1, //does not matter whatever sent
        pricePerUnit : cartItem.pricePerUnit,//does not matter whatever sent
        selectedSize : cartItem.selectedSize,//does not matter whatever sent
        totalPrice : cartItem.pricePerUnit * 1//does not matter whatever sent
      });

      //in frontend update the cart item quantity and total price also the cart value
      setCartItems(prevItems =>{
        const updatedItems = prevItems?.map(item =>
          item.cartItemId === cartItem.cartItemId
            ? { ...item, quantity: item.quantity - 1, totalPrice: item.totalPrice - item.pricePerUnit }
            : item
        ).filter(item => item.quantity > 0) //filter to show only items which have atleast 1 quantity.

        //set cart total again
        const totalPrice = updatedItems?.reduce((sum, item) => sum + item.totalPrice, 0);
        setCartTotal(totalPrice!);
        return updatedItems;
      });
    } catch (error) {
      console.log(error);
    }finally{
      setIsUpdatingCart(false);
    }
  };

  const removeCartItemCompletely = async (cartItemId : number) => {
    try {
      setIsUpdatingCart(true);
      await removeCartItem(cartItemId);
      //in frontend update the cart item quantity and total price also the cart value
      setCartItems(prevItems =>{
        const updatedItems = prevItems?.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: 0, totalPrice: 0 }
            : item
        ).filter(item => item.quantity > 0) //filter to show only items which have atleast 1 quantity.

        //set cart total again
        const totalPrice = updatedItems?.reduce((sum, item) => sum + item.totalPrice, 0);
        setCartTotal(totalPrice!);
        return updatedItems;
      });
    } catch (error) {
      console.log(error);
    }finally{
      setIsUpdatingCart(false);
    }
  };

  const handleClearCart = async () => {
    try{
      setIsUpdatingCart(true);
      await clearCart(cartId);
      setCartItems([]);
      addNotification("success", "Your cart is cleared.");
    }catch(error){
      console.log(error);
      addNotification("error", "Could not clear the cart.");
    }finally{
      setIsUpdatingCart(false);
    }
  };
 

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
      {/* Cart loader */}
      {isLoading && (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <p className="text-yellow-500 text-center mt-4 mr-8">Loading your cart. </p>
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
      )}

      {/* Empty Cart design */}
      {!isLoading && cartItems?.length ===0 && (
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <FaShoppingCart size={80} className="text-gray-300 mb-4" />
        <p className="text-xl font-semibold text-gray-600">Your cart is empty.</p>
        <Link href="/products">
          <button className="mt-4 px-6 py-3 bg-yellow-500 text-white rounded-xl shadow-lg hover:bg-yellow-600 transition-all">
            Browse Products
          </button>
        </Link>
      </div>
      )}
      {/* Cart Items Section */}
      {!isLoading && cartItems?.length!==0 && (
        <div className="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-xl overflow-hidden">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Cart total ₹{cartTotal}</h2>
        <div className="space-y-6 overflow-y-auto max-h-[60vh]">
          {cartItems?.map((item) => (
            <motion.div
              key={item.cartItemId}
              className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md transition-all hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Image src={item.productImage} alt="no image" width={80} height={80} className="rounded-lg border" />
              <div className="ml-4 flex-1 relative">
                <h3 className="text-lg font-semibold text-gray-900">{item.productName}</h3>
                <p className="text-sm text-gray-600">Size: <span className="font-medium">{item.selectedSize}</span></p>
                <p className="text-md font-bold text-gray-900">₹{(item.pricePerUnit * item.quantity).toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => reduceCartItemQuanity(item)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-l-lg hover:bg-gray-400 transition-all"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 border text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => increaseCartItemQuantity(item)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-r-lg hover:bg-gray-400 transition-all"
                  >
                    +
                  </button>
                </div>
                {isUpdatingCart &&(
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500" />
                  </div>
                )}
              </div>
              <button 
              onClick={() => removeCartItemCompletely(item.cartItemId)} 
              className="text-red-500 ml-4 hover:text-red-700">
                <FaTrash size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      )}

      {/* Address selection section */}
      {!isLoading && cartItems?.length!==0 && (
        <div className="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Delivery Address</h2>
        <div className="space-y-6 overflow-y-auto max-h-[60vh] ">
         <CheckoutComponent/>
        </div>
      </div>
      )}
      

      {/* Proceed to Checkout Section */}
      {!isLoading && cartItems?.length!==0 && (
        <div className="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-xl">
        <h3 className="text-xl font-semibold border-b pb-2 mb-4">Cart Summary</h3>
        
        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium">₹{cartTotal}</span>
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
            onClick={handleClearCart}
            className="w-full border-2 border-orange-500 text-orange-500 py-3 rounded-xl shadow-lg hover:bg-orange-500 hover:text-white transition-all"
          >
            Clear Cart
          </button>
          
            <button
              className="w-full flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 backdrop-blur-md border border-green-400"
            >
              Procced to pay ₹{total}
            </button>
          
          {/* Updated Checkout Message */}
          <div className="mt-4 flex items-center bg-blue-50 text-blue-600 text-sm p-3 rounded-lg shadow-md">
            <FaInfoCircle className="mr-2 text-lg" />
            <p>Payment system is not yet integrated. Soon it will be integrated with Phonepe PG.</p>
          </div>
        </div>
      </div>
      
      )}
      
    </div>
  );
};

export default CartComponent;
