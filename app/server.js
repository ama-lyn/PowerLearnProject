const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");

//Intialization
const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

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
