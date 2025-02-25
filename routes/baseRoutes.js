const { Router } = require("express");
const baseRouter = Router();
const messageController = require("../controllers/messageController.js");

baseRouter.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

baseRouter.get("/messages", (req, res) => {
  let membership = false;
  console.log(req.user);
  if (req.user) {
    membership = req.user.membership;
  }
  res.render("messages", {
    user: req.user,
    membershipStatus: membership,
  });
});

baseRouter.post("/messages/create", messageController.createMessage);
module.exports = baseRouter;
