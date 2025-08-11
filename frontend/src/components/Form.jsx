import React from "react";
import axios from "axios";

const Form = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");

  const [category, setCategory] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSignUp = async () => {
    if (!name || !description || !price || !category || !imageUrl) {
      alert("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const data = {
        name,
        description,
        price,
        category,
        imgUrl : imageUrl,
      };
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/products/add-product`, // Corrected endpoint
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      if (response.status === 201) {
        alert("Product created successfully");
      } else {
        alert("Error creating product");
      }
    } catch (error) {
      console.error("Error adding Product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Add your Product </h1>
        <span>Enter Product Name</span>
        <input
          className="border-2 border-gray-300 rounded-md p-2 m-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span>Enter the Description</span>
        <input
          className="border-2 border-gray-300 rounded-md p-2 m-2"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span>Enter the Price </span>
        <input
          className="border-2 border-gray-300 rounded-md p-2 m-2"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <span>Enter the Category</span>
        <input
          className="border-2 border-gray-300 rounded-md p-2 m-2"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <span>Enter the url of the Image</span>
        <input
          className="border-2 border-gray-300 rounded-md p-2 m-2"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button
          className="bg-orange-500 cursor-pointer text-white p-2 rounded-md m-2"
          type="submit"
          onClick={handleSignUp}
          disabled={loading}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Form;
