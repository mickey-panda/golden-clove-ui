import { motion } from "framer-motion";

interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto py-4 scrollbar-hide">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`px-4 py-2 rounded-full transition font-medium ${
            selectedCategory === category
              ? "bg-yellow-500 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-yellow-300"
          }`}
          whileTap={{ scale: 0.9 }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryList;
