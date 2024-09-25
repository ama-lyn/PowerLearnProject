const db = require("../config/db");

const Waste = {
  tableName: "wastes",

  // Insert new waste into the database
  createWaste: function (newWaste, callback) {
    db.query("INSERT INTO " + this.tableName + " SET ?", newWaste, callback);
  },

  // Fetch Waste Type
  getWasteType: function (callback) {
    const query =
      "SELECT type FROM " + this.tableName + " WHERE ";
    db.query(query, callback);
  },
};

module.exports = Waste;
