const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/food-delivery-app"; 
const bodyParser = require("body-parser");

const authRouter = require("./routes/auth.route");
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");
const orderRouter = require("./routes/order.route");

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.use(cors({
  origin: [process.env.FRONTEND_URL,"http://localhost:5173"], // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.get("/", (req, res) => {
  res.send("Welcome to the Food Delivery App API");
})

app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
