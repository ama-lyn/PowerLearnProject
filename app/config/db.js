const mysql = require("mysql2");
const dotenv = require("dotenv");

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

  db.query("CREATE DATABASE IF NOT EXISTS ECOFARM", (err) => {
    if (err) return console.log("Error creating Database:", err);
    console.log("Database created successfully");

    db.changeUser({ database: "ECOFARM" }, (err) => {
      if (err) return console.log("Error changing Database:", err);
      console.log("Database changed successfully");

      const createUsersTable = `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
          )`;

      const createProductsTable = `
          CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            product_name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            category VARCHAR(100),
            price DECIMAL(10, 2),
            quantity VARCHAR(100),
            location VARCHAR(255),
            date_posted DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE 
          );`;

      db.query(createUsersTable, (err) => {
        if (err) return console.log("Error creating users table:", err);
        console.log("Users table created successfully");
      });

      db.query(createProductsTable, (err) => {
        if (err) return console.log("Error creating products table:", err);
        console.log("Products table created successfully");
      });
    });
  });
});

module.exports = db;
