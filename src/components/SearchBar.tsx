import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search for spices, masala..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full py-2 px-4 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none"
      />
      <FaSearch className="absolute left-3 top-3 text-gray-500" />
    </div>
  );
};

export default SearchBar;
