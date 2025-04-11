import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
// import { useCart } from "@/contexts/CartContext";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "@/contexts/AuthProvider";
import { createCart, getCart } from "@/dbActions/cart-actions";
import { addOrUpdateCartItems } from "@/dbActions/cartItems-actions";
import { useNotification } from "@/contexts/NotificationProvider";

interface ProductItemProps {
  product: {
    productId: number;
    name: string;
    image: string;
    sizes: unknown;
    categories : unknown;
    description : string | null;
  };
}

interface CartItem {
  cartId: number;
  productId: number;
  selectedSize: string;
  quantity: number;
  pricePerUnit: number; // Ensure it's a number
  totalPrice: number; // Ensure it's a number
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState(
    (product.sizes as {size : string, price: number}[]).map((size) => ({ ...size, quantity: 0 }))
  );
  const[userId, setUserId] = useState("");
  // const { addToCart } = useCart();
  const {user} =useAuth();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const {addNotification} = useNotification();

  useEffect(()=>{
    if(user){
      setUserId(user?.uid);
    }
  },[user]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleQuantityChange = (sizeIndex: number, change: number) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.map((size, index) =>
        index === sizeIndex
          ? { ...size, quantity: Math.max(size.quantity + change, 0) }
          : size
      )
    );
  };

  const handleAddToCart = async () => {
    if (!userId) {
      addNotification("error","Login to add items to your cart.");
      return;
    }
  
    try {
      // Fetch or create cart for user
      let cartData = await getCart(userId);
      if (!cartData) {
        cartData = await createCart(userId);
      }
  
      const cartId = cartData.cartId;
  
      // Prepare cart items
      const cartItems: CartItem[] = selectedSizes
        .filter((size) => size.quantity > 0) // Only add sizes with quantity > 0
        .map((size) => ({
          cartId: cartId,
          productId: product.productId,
          selectedSize: size.size,
          quantity: size.quantity,
          pricePerUnit: size.price, // Keep as number
          totalPrice: size.price * size.quantity, // Keep as number
        }));
  
      // Add items to cart_items table
      await addOrUpdateCartItems(cartItems);
  
      // Close modal after successful addition
      closeModal();
      addNotification("success","Items are added to cart.");
    } catch (error) {
      console.error("Error adding to cart:", error);
      addNotification("error","Something went wrong, Items are not added to cart.");
    }
  };
  

  return (
    <div>
      <motion.div
        className="bg-white shadow-md rounded-lg p-3 hover:shadow-xl transition duration-300 cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        <div className="w-full h-36 flex items-center justify-center py-2">
          <Image
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
            className="rounded-md object-contain"
          />
        </div>

        <h3 className="text-sm font-semibold mt-2 text-center">
          {product.name}
        </h3>

        <button
          onClick={openModal}
          className="mt-2 w-full bg-yellow-500 text-white py-1 rounded-md text-sm hover:bg-yellow-600 transition"
        >
          Add to Cart
        </button>
      </motion.div>

      {/* Modal for Web & Bottom Sheet for Mobile */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={closeModal}
        >
          {/* Background Overlay */}
          <div className="fixed inset-0 bg-gray-700 opacity-70" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel
              className={`${
                isMobile ? "bottom-0 absolute w-full" : "w-80"
              } bg-white p-5 rounded-md max-h-[85vh] overflow-y-auto`}
            >
              {/* Image and Description Row */}
              <div className="flex w-full mb-3">
                <div className="w-[30%] flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={90}
                    height={90}
                    className="rounded-sm object-contain"
                  />
                </div>
                <div className="w-[70%] flex items-center">
                  <p className="text-sm text-gray-600 text-center">{product.description}</p>
                </div>
              </div>

              {/* Title */}
              <DialogTitle className="text-base font-medium text-center text-gray-800">
                {product.name} - Options
              </DialogTitle>

              {/* Size Selection */}
              <div className="mt-3 space-y-2">
                {selectedSizes.map((size, index) => (
                  <div
                    key={size.size}
                    className="flex items-center justify-between pb-2 border-b border-gray-100"
                  >
                    <span className="text-sm text-gray-600">
                      {size.size} - ₹{size.price}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(index, -1)}
                        className="bg-yellow-500 px-1.5 py-0.5 rounded-sm text-white hover:bg-yellow-600"
                      >
                        -
                      </button>
                      <span className="text-sm text-gray-800">{size.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(index, 1)}
                        className="bg-yellow-500 px-1.5 py-0.5 rounded-sm text-white hover:bg-yellow-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="mt-4 w-full bg-yellow-500 text-white py-1.5 rounded-sm text-sm hover:bg-yellow-600"
              >
                Add to Cart
              </button>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>

    </div>
  );
};

export default ProductItem;
