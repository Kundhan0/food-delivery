import React from "react";
import axois from "axios";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [role, setRole] = React.useState("user");
  const [loading, setLoading] = React.useState(false);

    const handleSignUp = async () => {
        if (!email || !password || !name || !address) {
            alert("Please fill all the fields");
            return;
        }
        setLoading(true);
        try {
            const data ={
                name,
                email,
                password,
                address,
                role: role ? "admin" : "user",
            }
            const response = await axois.post(`${import.meta.env.VITE_PUBLIC_API_URL}/auth/signup`, data);

             console.log(response.data);
            if (response.status === 201) {
                alert("User created successfully");
                Navigate("/signin");
            } else {
                alert("Error creating user");
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }finally{
            setLoading(false);
        }
    }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 to-orange-400">
    <form className="flex flex-col gap-6 bg-white shadow-2xl rounded-2xl px-10 py-12 w-full max-w-md">
      <h1 className="text-4xl font-extrabold text-center text-orange-500 mb-8">Sign Up</h1>
      <span className="text-gray-800 font-semibold">Enter your Name</span>
      <input
        className="border border-orange-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="text-gray-800 font-semibold">Enter your Email</span>
      <input
        className="border border-orange-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <span className="text-gray-800 font-semibold">Enter your Password</span>
      <input
        className="border border-orange-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span className="text-gray-800 font-semibold">Enter your Address</span>
      <input
        className="border border-orange-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="accent-orange-500"
          value={role}
          onChange={(e) => setRole(e.target.checked)}
        />
        <span className="text-gray-700">Do you own a Restaurant</span>
      </div>
      <button
        className="bg-orange-500 hover:bg-orange-600 transition text-white font-bold p-3 rounded-lg mt-4 disabled:opacity-60"
        type="submit"
        onClick={handleSignUp}
        disabled={loading}
      >
        Sign Up
      </button>
    </form>
  </div>
);
};

export default SignUp;
