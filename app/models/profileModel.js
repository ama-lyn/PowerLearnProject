const db = require("../config/db");

const Profile = {
  tableName: "profiles",

  // Add profile image
  addProfileImage: function (newProfileImage, callback) {
    const sql = `INSERT INTO profiles (user_id, profile_image) VALUES (?, ?)`;
    const values = [newProfileImage.user_id, newProfileImage.profile_image];

    db.query(sql, values, (error, result) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, result);
    });
  },

  // Add social links 
  addSocialLinks: function (newSocialLinks, callback) {
    const sql = `INSERT INTO profiles (user_id, facebook_link, linkedin_link, instagram_link) VALUES (?, ?, ?, ?)`;
    const values = [
      newSocialLinks.user_id,
      newSocialLinks.facebook_link,
      newSocialLinks.linkedin_link,
      newSocialLinks.instagram_link,
    ];

    db.query(sql, values, (error, result) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, result);
    });
  },

  // Add personal info
  addPersonalInfo: function (newPersonalInfo, callback) {
    const sql = `INSERT INTO profiles (user_id, title, gender, phone_number, national_id_number, location) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
      newPersonalInfo.user_id,
      newPersonalInfo.title,
      newPersonalInfo.gender,
      newPersonalInfo.phone_number,
      newPersonalInfo.national_id_number,
      newPersonalInfo.location,
    ];

    db.query(sql, values, (error, result) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, result);
    });
  },

  // Fetch a user profile
  getProfile: function (user_id, callback) {
    const sql = `SELECT * FROM profiles WHERE user_id = ?`;
    db.query(sql, [user_id], (error, result) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, result[0]);
    });
  },
};

module.exports = Profile;
