import axios from "axios";
import React from "react";

const ProductList = ({ products }) => {
  const [loading, setLoading] = React.useState(null);
  const handleToCart = async (productId) => {
    console.log("Adding product to cart:", productId);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add items to the cart.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/cart/add-product`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Product added to cart successfully!");
      } else {
        alert("Failed to add product to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-md">
            <img
              src={product.imgUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">Rs.{product.price || product.totalAmount}</p>
            
          {window.location.pathname == '/' &&
            <button
              disabled={loading}
              onClick={() => handleToCart(product._id)}
              className="bg-orange-400 px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
            >
              Add to Cart
            </button>}

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
