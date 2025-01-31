const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController.js");
const { body } = require("express-validator");
const db = require("../db/queries");

//ADD UNIQUE USER EMAIL EVENTUALLY 1/30 1:45am
const validateSignup = [
  body("username")
    .trim()
    .isLength({ min: 4, max: 16 })
    .withMessage(
      "Username must be at least 4 characters and no longer than 16 characters"
    )
    .custom(async (value) => {
      const users = await db.getUsernameMatches(value);
      if (users.length > 0) {
        throw new Error(
          "A user with the username " + value + " already exists."
        );
      }
    }),
  body("conf_password")
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage(
      "Password must be at least 8 characters and no longer than 16 characters"
    )
    .custom(async (conf_password, { req }) => {
      const password = req.body.password;
      if (password !== conf_password) {
        throw new Error("Passwords must be the same");
      }
    }),
  body("email")
    .trim()
    .isEmail()
    .custom(async (value) => {
      const emails = await db.getEmailMatches(value);
      if (emails.length > 0) {
        throw new Error("An account under that email already exists");
      }
    }),
];

userRouter.get("/signup", (req, res) => {
  res.render("signUpForm");
});
userRouter.post("/signup", [validateSignup], userController.createUser);

module.exports = userRouter;
