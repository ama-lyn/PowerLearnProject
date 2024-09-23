const express = require("express");
const router = express.Router();
const Profile = require("../models/profileModel");
const authenticateToken = require("../middlewares/authenticateToken");

//Posting a User Profile route
router.post("/", authenticateToken, async (req, res) => {
  try {
    const newProfile = {
      user_id: req.user.id,
      title: req.body.title,
      gender: req.body.gender,
      phone_number: req.body.phone_number,
      national_id_number: req.body.national_id_number,
      location: req.body.location,
      profile_image: req.body.profile_image,
      facebook_link: req.body.facebook_link,
      linkedin_link: req.body.linkedin_link,
      instagram_link: req.body.instagram_link,
    };

    //Save the new Product in the Database
    Profile.createProfile(newProfile, (error, result) => {
      if (error) {
        console.error(
          "An error occured while saving the record:",
          error.message
        );
        return res.status(500).json({ error: error.message });
      }
      console.log("New Profile record saved!");
      res.status(201).json({ message: "Profile created successfully" });
    });
  } catch (error) {
    console.error("Error in creating profile:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Getting a User Profile route
router.get("/me", authenticateToken, (req, res) => {
  try {
    const user_id = req.user.id;

    Profile.getProfile(user_id, (error, profile) => {
      if (error) {
        console.error("Error fetching profile:", error.message);
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json(profile);
    });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
