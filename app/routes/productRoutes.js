const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const authenticateToken = require("../middlewares/authenticateToken");

//Posting a Porduct Route
router.post("/", authenticateToken, async (req, res) => {
  try {
    // Define a new product object
    const newProduct = {
        user_id: req.user.id,
        product_name: req.body.product_name,
        quantity: req.body.quantity,
        price: req.body.price,
        location: req.body.location,
        description: req.body.description,
        category: req.body.category || 'Sell', 
    };

    //Save the new Product in the Database
    Product.createProduct(newProduct, (error, result) => {
      if (error) {
        console.error(
          "An error occured while saving the record:",
          error.message
        );
        return res.status(500).json({ error: error.message });
      }
      console.log("New Product record saved!");
      res.status(201).json({ message: "Product created successfully" });
    });
  } catch (error) {
    console.error("Error in creating user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Getting all Products route 
router.get("/", authenticateToken, (req, res) => {
    try {
      Product.getAllProducts((error, products) => {
        if (error) {
          console.error("Error fetching products:", error.message);
          return res.status(500).json({ error: error.message });
        }
        res.status(200).json(products);
      });
    } catch (error) {
      console.error("Error fetching products:", error.message);
      res.status(500).json({ error: error.message });
    }
});

module.exports= router;