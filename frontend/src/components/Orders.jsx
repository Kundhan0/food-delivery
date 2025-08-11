import React from "react";
import ProductList from "./Product";
import axios from "axios";
import { useEffect } from "react";

const Orders = () => {
  const [products, setProducts] = React.useState([]);
  const getProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/orders/my-orders`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        
        setProducts(response.data.products);
        console.log("Fetched orders:", response.data.products[0].items);
      } else {
        alert("Failed to fetch products. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch orders. Please try again later.");
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return products.length === 0 ? (
    <div className="text-center mt-8">No orders found.</div>
  ) : (
    <ProductList products={products} />
  );
};

export default Orders;
