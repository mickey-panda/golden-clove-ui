import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";

interface ProductItemProps {
  product: {
    productId: number;
    name: string;
    image: string;
    sizes: unknown;
    categories : unknown;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState(
    (product.sizes as {size : string, price: number}[]).map((size) => ({ ...size, quantity: 0 }))
  );
  const { addToCart } = useCart();
  const isMobile = useMediaQuery({ maxWidth: 768 });

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

  const handleAddToCart = () => {
    selectedSizes.forEach((size) => {
      if (size.quantity > 0) {
        addToCart({
          id: product.productId,
          name: product.name,
          image: product.image,
          price: size.price,
          size: size.size,
          quantity: size.quantity,
        });
      }
    });
    closeModal();
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
          {/* Improved Background Overlay */}
          <div className="fixed inset-0 bg-gray-700 opacity-80" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel
              className={`${
                isMobile ? "bottom-0 absolute w-full" : "w-96"
              } bg-white p-4 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto`}
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
              {/* Updated Title Text */}
              <DialogTitle className="text-lg font-semibold text-center text-gray-900">
                {product.name} - Select option 
              </DialogTitle>

              <div className="mt-4 space-y-3">
                {selectedSizes.map((size, index) => (
                  <div
                    key={size.size}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <span className="text-sm text-gray-700">
                      {size.size} - ₹{size.price}
                    </span>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleQuantityChange(index, -1)}
                        className="bg-yellow-500 px-2 py-1 rounded-md hover:bg-yellow-700"
                      >
                        -
                      </button>
                      <span className="font-semibold text-gray-800">{size.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(index, 1)}
                        className="bg-yellow-500 px-2 py-1 rounded-md hover:bg-yellow-700"
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
                className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md text-sm hover:bg-yellow-600 transition"
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
