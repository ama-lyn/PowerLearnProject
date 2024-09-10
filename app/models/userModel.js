const db = require("../config/db");

const User = {
  tableName: "users",
  createUser: function (newUser, callback) {
    db.query("INSERT INTO " + this.tableName + " SET ?", newUser, callback);
  },
  getUserByEmail: function (email, callback) {
    db.query(
      "SELECT * FROM " + this.tableName + " WHERE email = ?",
      [email],
      (err, results) => {
        if (err) return callback(err);
        callback(null, results.length > 0);
      }
    );
  },
  getUserByUsername: function (username, callback) {
    db.query(
      "SELECT * FROM " + this.tableName + " WHERE username = ?",
      [username],
      (err, results) => {
        if (err) return callback(err);
        callback(null, results.length > 0);
      }
    );
  },
};

module.exports = User;
