const { check } = require("express-validator");
const User = require("../models/UserModel");

const registrationValidationChecks = [
  check("firstName", "First Name is required").not().isEmpty(),
  check("lastName", "Last Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("username", "Username is required").not().isEmpty(),
  check("password", "Password must be 6 or more characters").isLength({
    min: 6,
  }),
  check("confirmPassword", "Confirm password is required").not().isEmpty(),

  check("email").custom((value) => {
    return new Promise((resolve, reject) => {
      User.getUserByEmail(value, (err, exists) => {
        if (err) return reject(err);
        if (exists) return reject(new Error("Email already exists"));
        resolve();
      });
    });
  }),

  check("username")
    .isAlphanumeric()
    .withMessage("Invalid username. Provide alphanumeric values.")
    .custom((value) => {
      return new Promise((resolve, reject) => {
        User.getUserByUsername(value, (err, exists) => {
          if (err) return reject(err);
          if (exists) return reject(new Error("Username already in use."));
          resolve();
        });
      });
    }),
];

module.exports = registrationValidationChecks;
