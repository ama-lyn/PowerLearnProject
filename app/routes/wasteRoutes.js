const express = require("express");
const router = express.Router();
const Waste = require("../models/wasteModel");
const authenticateToken = require("../middlewares/authenticateToken");

//Posting Waste 
router.post("/", authenticateToken, async (req, res) => {
  try {
    // Define a new  Waste object
    const newWaste = {
        user_id: req.user.id,
        type: req.body.type,
        source: req.body.source,
    };

    //Save the new Waste in the Database
    Waste.createWaste(newWaste, (error, result) => {
      if (error) {
        console.error(
          "An error occured while saving the record:",
          error.message
        );
        return res.status(500).json({ error: error.message });
      }
      console.log("New Waste record saved!");
      res.status(201).json({ message: "Waste created successfully" });
    });
  } catch (error) {
    console.error("Error in creating user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Getting all wastes type route 
router.get("/", authenticateToken, (req, res) => {
    try {
      const user_id = req.user.id;

      Waste.getWaste(user_id, (error, waste) => {
        if (error) {
          console.error("Error fetching wastes:", error.message);
          return res.status(500).json({ error: error.message });
        }
        res.status(200).json(waste);
      });
    } catch (error) {
      console.error("Error fetching wastes:", error.message);
      res.status(500).json({ error: error.message });
    }
});

module.exports= router;