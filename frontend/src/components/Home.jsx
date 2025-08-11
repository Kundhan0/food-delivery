import React from "react";
import ProductList from "./Product";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  const [products, setProducts] = React.useState([]);
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PUBLIC_API_URL}/products/get-product`
      );
      if (response.status === 200) {
        
        setProducts(response.data.products);
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
  return <ProductList products={products} />;
};

export default Home;
