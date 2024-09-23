const db = require("../config/db");

const Profile = {
  tableName: "profiles",

  // Insert new profile into the database
  createProfile: function (newProfile, callback) {
    const sql = `
    INSERT INTO profiles (user_id, title, gender, phone_number, national_id_number, location, profile_image, facebook_link, linkedin_link, instagram_link)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
    const values = [
      newProfile.user_id,
      newProfile.title,
      newProfile.gender,
      newProfile.phone_number,
      newProfile.national_id_number,
      newProfile.location,
      newProfile.profile_image,
      newProfile.facebook_link,
      newProfile.linkedin_link,
      newProfile.instagram_link,
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
      callback(null, result[0]); // Return the first profile matching the user_id
    });
  },
};

module.exports = Profile;
