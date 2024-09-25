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

      const createProfilesTable = `
            CREATE TABLE IF NOT EXISTS profiles  (
              id INT AUTO_INCREMENT PRIMARY KEY,
              user_id INT NOT NULL,
              title VARCHAR(50),
              gender VARCHAR(10),
              phone_number VARCHAR(20),
              national_id_number VARCHAR(20),
              location VARCHAR(255),
              profile_image VARCHAR(255), 
              facebook_link VARCHAR(255),
              linkedin_link VARCHAR(255),
              instagram_link VARCHAR(255),
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );`;

      const createWastesTable = `
            CREATE TABLE IF NOT EXISTS wastes (
              id INT AUTO_INCREMENT PRIMARY KEY,
              type VARCHAR(50) NOT NULL,
              source VARCHAR(100),
              user_id INT,
              FOREIGN KEY (user_id) REFERENCES users(id) 
            );`;

      db.query(createUsersTable, (err) => {
        if (err) return console.log("Error creating users table:", err);
        console.log("Users table created successfully");
      });

      db.query(createProductsTable, (err) => {
        if (err) return console.log("Error creating products table:", err);
        console.log("Products table created successfully");
      });

      db.query(createProfilesTable, (err) => {
        if (err) return console.log("Error creating profiles table:", err);
        console.log("Profiles table created successfully");
      });

      db.query(createWastesTable, (err)=>{
        if (err) return console.log("Error creating wastes table:", err);
        console.log("Wastes table created successfully");
      })
    });
  });
});

module.exports = db;
