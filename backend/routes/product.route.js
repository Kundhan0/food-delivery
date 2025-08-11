const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const authenticate = require("../utils/authenticate");
const Product = require("../models/product.model");

router.post("/add-product", authenticate, async (req, res) => {
  try {
    const { name, description, price, category, imgUrl } = req.body;
    const user = await User.findById(req.user._id);

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    console.log(req.body);
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      imgUrl,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully"});
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
    console.error("Error details:", error);
  }
});

router.get("/get-product", async (req, res) => {
  try {
    const products = await Product.find({});
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
