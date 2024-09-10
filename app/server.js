const express = require('express')
const dotenv = require("dotenv");
const mysql = require('mysql2');


//Initialization
const app = express();
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
  
db.connect((err) => {
    if (err) return console.log("Error connecting to Database:", err);
    console.log("Database connected successfully");
})

app.get('/test', (req, res)=>{
    res.send("Starting my project")
})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})