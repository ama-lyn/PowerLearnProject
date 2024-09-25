const express = require("express");
const router = express.Router();
const Profile = require("../models/profileModel");
const authenticateToken = require("../middlewares/authenticateToken");

// POST route for profile image
router.post("/profile-image", authenticateToken, async (req, res) => {
  try {
    const newProfileImage = {
      user_id: req.user.id, 
      profile_image: req.body.profile_image,
    };

    Profile.addProfileImage(newProfileImage, (error, result) => {
      if (error) {
        console.error(
          "An error occurred while saving the profile image:",
          error.message
        );
        return res.status(500).json({ error: error.message });
      }
      console.log("Profile image saved!");
      res.status(201).json({ message: "Profile image added successfully" });
    });
  } catch (error) {
    console.error("Error in adding profile image:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST route for social links
router.post("/social-links", authenticateToken, async (req, res) => {
  try {
    const newSocialLinks = {
      user_id: req.user.id, 
      facebook_link: req.body.facebook_link,
      linkedin_link: req.body.linkedin_link,
      instagram_link: req.body.instagram_link,
    };

    Profile.addSocialLinks(newSocialLinks, (error, result) => {
      if (error) {
        console.error(
          "An error occurred while saving social links:",
          error.message
        );
        return res.status(500).json({ error: error.message });
      }
      console.log("Social links saved!");
      res.status(201).json({ message: "Social links added successfully" });
    });
  } catch (error) {
    console.error("Error in adding social links:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST route for personal info
router.post("/personal-info", authenticateToken, async (req, res) => {
  try {
    const newPersonalInfo = {
      user_id: req.user.id, 
      title: req.body.title,
      gender: req.body.gender,
      phone_number: req.body.phone_number,
      national_id_number: req.body.national_id_number,
      location: req.body.location,
    };

    Profile.addPersonalInfo(newPersonalInfo, (error, result) => {
      if (error) {
        console.error(
          "An error occurred while saving personal info:",
          error.message
        );
        return res.status(500).json({ error: error.message });
      }
      console.log("Personal info saved!");
      res.status(201).json({ message: "Personal info added successfully" });
    });
  } catch (error) {
    console.error("Error in adding personal info:", error.message);
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
