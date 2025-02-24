const { validationResult } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const passport = require("passport");

async function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).render("failure");
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.createUser(
      req.body.username,
      hashedPassword,
      req.body.email,
      req.body.first_name,
      req.body.last_name
    );
    res.redirect("/");
  }
}

async function userLogIn(req, res) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  });
}

async function initiateMember(req, res) {
  console.log(req.body.secretCode, req.user);
  if (req.body.secretCode.toLowerCase() == "yes") {
    db.giveUserMembership(req.user.userid);
    res.redirect("/");
  } else {
    res.redirect("/user/initiate");
  }
}
module.exports = {
  createUser,
  userLogIn,
  initiateMember,
};
