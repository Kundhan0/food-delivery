import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLogedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handlesigninLogut = () => {
    if (isLogedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/signin");
    } else {
      navigate("/signin");
    }
  }

  const handleProtectedRoute = (path) => {
    if (isLogedIn) {
      navigate(path);
    } else {
      navigate("/signin");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-orange-400 text-white flex justify-between items-center px-8 py-5 shadow-lg">
      <h1 className="cursor-pointer text-2xl font-extrabold tracking-wide hover:text-orange-100 transition" onClick={() => navigate("/")}>
        Foodie
      </h1>
      <div className="flex space-x-6 items-center ">
        <button
          onClick={() => handleProtectedRoute("/cart")}
          className="px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
        >
          Cart
        </button>
        <button
          onClick={() => handleProtectedRoute("/orders")}
          className="px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
        >
          Orders
        </button>
        <button
          onClick={() => handleProtectedRoute("/admin")}
          className="px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
        >
          A
        </button>
        <button className="bg-white text-orange-500 px-5 py-2 rounded-lg font-bold shadow hover:bg-orange-100 transition " onClick={handlesigninLogut}>{isLogedIn ? "Logout" : "signin"}</button>
      </div>
    </nav>
  );
};

export default Navbar;
