import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
=======
import Navbar from "./components/Navbar";
>>>>>>> 869f2f8ee22d3ccd013be2e109313a45f81ee47f
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Form from "./components/Form";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Navbar from "./components/Navbar.jsx"; 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/admin" element={<Form />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
