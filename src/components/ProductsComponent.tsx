"use client";

import { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import ProductGrid from "./ProductGrid";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import FloatingCartButton from "./FloatingCartButton";
import { getProducts } from "@/dbActions/products-actions";
import { useAuth } from "@/contexts/AuthProvider";

const categories = ["All", "Whole Spice", "Pure Spice", "Blended Spice"];
interface Product {
  productId : number,
  name: string;
  image: string;
  sizes: unknown; // Array of objects with size & price
  categories: unknown; // Array of category names
}

const ProductsComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const[products, setProducts] = useState<Product[]>([]);
  const {user} = useAuth();

  useEffect(() => {
    setLoading(true);
    getAllProducts();
    setLoading(false);
  }, []);

  const getAllProducts = async()=>{
    const productsRetrieved = await getProducts();
    setProducts(productsRetrieved);
  }
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || (product.categories as string[]).includes(selectedCategory)) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <motion.h1 
            className="text-4xl font-bold text-yellow-600 text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Products
      </motion.h1>

      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <CategoryList categories={categories} selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />

      <ProductGrid products={filteredProducts} loading={loading} />
      {user && (
        <FloatingCartButton/>
      )}
      
    </div>
  );
};

export default ProductsComponent;
