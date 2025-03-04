import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductItemProps {
  product: {
    id: number;
    name: string;
    image: string;
    sizes: { size: string; price: string }[];
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <motion.div
      className="bg-white shadow-md rounded-lg p-3 hover:shadow-xl transition duration-300 cursor-pointer"
      whileHover={{ scale: 1.05 }}
    >
      {/* Product Image with Margin/Padding */}
      <div className="w-full h-36 flex items-center justify-center py-2">
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
          className="rounded-md object-contain"
        />
      </div>

      {/* Product Info */}
      <h3 className="text-sm font-semibold mt-2 text-center">{product.name}</h3>

      {/* Size Selector */}
      <div className="mt-1">
        <select
          className="w-full border rounded-md px-2 py-1 text-sm bg-gray-100"
          onChange={(e) => {
            const newSize = product.sizes.find((s) => s.size === e.target.value);
            if (newSize) setSelectedSize(newSize);
          }}
          value={selectedSize.size}
        >
          {product.sizes.map((size) => (
            <option key={size.size} value={size.size}>
              {size.size}
            </option>
          ))}
        </select>
      </div>

      {/* Price Display */}
      <p className="text-gray-700 mt-1 text-sm font-semibold text-center">
        {selectedSize.price}
      </p>

      {/* Add to Cart Button */}
      <button className="mt-2 w-full bg-yellow-500 text-white py-1 rounded-md text-sm hover:bg-yellow-600 transition">
        Add to Cart
      </button>
    </motion.div>
  );
};

export default ProductItem;
