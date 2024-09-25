const db = require("../config/db");

const Profile = {
  tableName: "profiles",

  // Add or update profile image
  addProfileImage: function (newProfileImage, callback) {
    const checkSql = `SELECT * FROM ${this.tableName} WHERE user_id = ?`;
    
    db.query(checkSql, [newProfileImage.user_id], (error, result) => {
      if (error) {
        return callback(error, null);
      }

      if (result.length > 0) {
        // Update existing profile image
        const sql = `UPDATE ${this.tableName} SET profile_image = ? WHERE user_id = ?`;
        db.query(sql, [newProfileImage.profile_image, newProfileImage.user_id], callback);
      } else {
        // Insert new profile image
        const sql = `INSERT INTO ${this.tableName} (user_id, profile_image) VALUES (?, ?)`;
        const values = [newProfileImage.user_id, newProfileImage.profile_image];
        db.query(sql, values, callback);
      }
    });
  },

  // Add or update social links 
  addSocialLinks: function (newSocialLinks, callback) {
    const checkSql = `SELECT * FROM ${this.tableName} WHERE user_id = ?`;

    db.query(checkSql, [newSocialLinks.user_id], (error, result) => {
      if (error) {
        return callback(error, null);
      }

      if (result.length > 0) {
        // Update existing social links
        const sql = `UPDATE ${this.tableName} SET facebook_link = ?, linkedin_link = ?, instagram_link = ? WHERE user_id = ?`;
        const values = [
          newSocialLinks.facebook_link,
          newSocialLinks.linkedin_link,
          newSocialLinks.instagram_link,
          newSocialLinks.user_id,
        ];
        db.query(sql, values, callback);
      } else {
        // Insert new social links
        const sql = `INSERT INTO ${this.tableName} (user_id, facebook_link, linkedin_link, instagram_link) VALUES (?, ?, ?, ?)`;
        const values = [
          newSocialLinks.user_id,
          newSocialLinks.facebook_link,
          newSocialLinks.linkedin_link,
          newSocialLinks.instagram_link,
        ];
        db.query(sql, values, callback);
      }
    });
  },

  // Add or update personal info
  addPersonalInfo: function (newPersonalInfo, callback) {
    const checkSql = `SELECT * FROM ${this.tableName} WHERE user_id = ?`;

    db.query(checkSql, [newPersonalInfo.user_id], (error, result) => {
      if (error) {
        return callback(error, null);
      }

      if (result.length > 0) {
        // Update existing personal info
        const sql = `UPDATE ${this.tableName} SET title = ?, gender = ?, phone_number = ?, national_id_number = ?, location = ? WHERE user_id = ?`;
        const values = [
          newPersonalInfo.title,
          newPersonalInfo.gender,
          newPersonalInfo.phone_number,
          newPersonalInfo.national_id_number,
          newPersonalInfo.location,
          newPersonalInfo.user_id,
        ];
        db.query(sql, values, callback);
      } else {
        // Insert new personal info
        const sql = `INSERT INTO ${this.tableName} (user_id, title, gender, phone_number, national_id_number, location) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [
          newPersonalInfo.user_id,
          newPersonalInfo.title,
          newPersonalInfo.gender,
          newPersonalInfo.phone_number,
          newPersonalInfo.national_id_number,
          newPersonalInfo.location,
        ];
        db.query(sql, values, callback);
      }
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
