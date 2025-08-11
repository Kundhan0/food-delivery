import React from "react";
import ProductList from "./Product";
import axios from "axios";
import { useEffect } from "react";

const Cart = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const getProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_PUBLIC_API_URL}/cart/get-product`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const allItems = response.data.products.items
          .map((item) => item.product)
          .filter((product) => product !== null && product !== undefined);
        setProducts(allItems);
      } else {
        alert("Failed to fetch products. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products. Please try again later.");
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleOrderPlacement = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/orders/place`,
        { },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Order placed successfully!");
        setProducts([]); 
      } 
      else if (response.status === 400) {
        alert("No products in the cart to place an order.");
      }
      else {
        alert("Failed to place order. Please try again later.");
      }
      
    } catch (error) {
    console.error("Error placing order:", error);
      alert("Failed to place order. Please try again later.");      
    }finally {
      setLoading(false);
    }
  }


  return <div>
    <button className="bg-blue-500 w-fit m-3 cursor-pointer py-1 rounded-md hover:bg-blue-600"
    onClick={handleOrderPlacement}
    disabled={loading}
    >Place Order</button>
    <ProductList products={products} />
  </div>;
};

export default Cart;
