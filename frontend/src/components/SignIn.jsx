import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const data = { email, password };
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/auth/signin`,
        data
      );

      if (response.status === 200) {
        alert("Signed In successfully");
        localStorage.setItem("token", response.data.token);
      
        navigate("/");
      } else {
        alert("Error Signing In");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Sign in failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
    <div className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md">
      <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">Sign In</h1>
        <label className="text-gray-700 font-medium">Email</label>
        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <label className="text-gray-700 font-medium">Password</label>
        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button
          className="bg-orange-500 hover:bg-orange-600 transition text-white font-semibold p-2 rounded-md mt-2 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <div className="text-center mt-6">
        <span className="text-gray-600">Don't have an account? </span>
        <button
          type="button"
          className="text-orange-500 hover:underline font-semibold"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  </div>
);
};

export default SignIn;