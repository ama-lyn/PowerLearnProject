const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require("../config/db");
const User = require("../models/UserModel");
const registrationValidationChecks = require("../middlewares/registrationValidationchecks");

// User Registration route
router.post("/register", registrationValidationChecks, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if passwords match
  if (req.body.password !== req.body.confirmPassword) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Passwords do not match" }] });
  }

  // Hash the password
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Define a new user object
    const newUser = {
      firstName:req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    };

    // Save the new user in the Database
    User.createUser(newUser, (error) => {
      if (error) {
        console.error(
          "An error occurred while saving the record:",
          error.message
        );
        return res.status(500).json({ error: error.message });
      }
      console.log("New user record saved!");
      res.status(201).json({ message: "User created successfully" });
    });
  } catch (error) {
    console.error("Error in creating user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// User Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json("Missing username or password");
    }

    const query = `SELECT * FROM users WHERE username = ?`;
    db.query(query, [username], (err, data) => {
      if (err) {
        console.error("Error querying users:", err);
        return res.status(500).json("Database query error");
      }

      // If user doesn't exist
      if (data.length === 0) {
        return res.status(404).json("Invalid username or password");
      }

      // If user exists
      const user = data[0];
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      // Password is not valid
      if (!isPasswordValid) {
        return res.status(401).json("Invalid username or password");
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Send the token in the response
      res.status(200).json({ message: "Login successful", token });
    });
  } catch (err) {
    console.error("Internal Server Error:", err);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
