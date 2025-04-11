import ProductItem from "./ProductItem";

interface ProductGridProps {
  products: {
    productId: number;
    name: string;
    image: string;
    sizes: unknown;
    categories : unknown;
    description : string | null;
  }[];
  loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-4 animate-pulse"
          >
            <div className="h-40 bg-gray-300 rounded-md"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded mt-3"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded mt-2"></div>
            <div className="h-8 w-full bg-gray-300 rounded mt-3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-6">
      {products.map((product) => (
        <ProductItem key={product.productId} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
