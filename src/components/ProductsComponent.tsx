"use client";

import { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import ProductGrid from "./ProductGrid";
import SearchBar from "./SearchBar";
import products from "../data/products"

const categories = ["All", "Whole Spice", "Pure Spice", "Blended Spice"];


const ProductsComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.categories.includes(selectedCategory)) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-yellow-600 mb-6">Our Products</h1>

      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <CategoryList categories={categories} selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />

      <ProductGrid products={filteredProducts} loading={loading} />
    </div>
  );
};

export default ProductsComponent;
