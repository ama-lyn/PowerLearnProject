const db = require("../config/db");

const Waste = {
  tableName: "wastes",

  // Insert new waste into the database
  createWaste: function (newWaste, callback) {
    db.query("INSERT INTO " + this.tableName + " SET ?", newWaste, callback);
  },

  // Fetch Waste
  getWaste: function (user_id, callback) {
    const sql = `SELECT * FROM wastes WHERE user_id = ?`;
    db.query(sql, [user_id], (error, result) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, result);
    });
  },
};

module.exports = Waste;
