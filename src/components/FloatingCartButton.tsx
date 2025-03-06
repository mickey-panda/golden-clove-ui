import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const FloatingCartButton = () => {
  const { cart } = useCart();

  return (
    <Link href="/cart">
      <div className="fixed bottom-6 right-6 bg-yellow-500 text-white rounded-full p-4 shadow-lg flex items-center justify-center hover:bg-yellow-600 transition cursor-pointer">
        <FaShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </div>
    </Link>
  );
};

export default FloatingCartButton;
