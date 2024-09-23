const db = require("../config/db");

const Product = {
  tableName: "products",

  // Insert new product into the database
  createProduct: function (newProduct, callback) {
    db.query("INSERT INTO " + this.tableName + " SET ?", newProduct, callback);
  },

  // Fetch all products for sale
  getAllProducts: function (callback) {
    const query =
      "SELECT * FROM " + this.tableName + " WHERE category = 'Sell'";
    db.query(query, callback);
  },
};

module.exports = Product;
