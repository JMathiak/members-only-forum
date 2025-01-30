const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController.js");
const { body } = require("express-validator");

//ADD UNIQUE USER EMAIL EVENTUALLY 1/30 1:45am
const validateSignup = [
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
  body("email").trim().isEmail(),
];

userRouter.get("/signup", (req, res) => {
  res.render("signUpForm");
});
userRouter.post("/signup", [validateSignup], userController.createUser);

module.exports = userRouter;
