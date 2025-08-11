const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user.model");
const authenticate = require("../utils/authenticate");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

router.post("/add-product", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }
    }

    await cart.save();
    res
      .status(200)
      .json({ message: "Product added to cart successfully"});
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
    console.error("Error details:", error);
  }
});

router.get("/get-product", authenticate, async (req, res) => {
  try {
    const products = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res
      .status(200)
      .json({ message: "Products fetched successfully", products });
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});
module.exports = router;
