const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const authRoutes = require("./routes/authRoutes");

//Intialization
const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "public")));


app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "register.html"));
  });
  
  app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "login.html"));
  });
  
  app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "dashboard.html"));
  });

  app.get("/directory", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "directory.html"));
  });

  app.get("/market", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "market.html"));
  });

  app.get("/profile", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "profile.html"));
  });

// Session management
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
