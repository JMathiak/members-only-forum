const { Router } = require("express");
const baseRouter = Router();
const messageController = require("../controllers/messageController.js");
const db = require("../db/queries");

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

baseRouter.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

baseRouter.get("/messages", messageController.getMessagePage);

baseRouter.post("/messages/create", messageController.createMessage);
baseRouter.post("/messages/delete/:id", messageController.deleteMessage);
module.exports = baseRouter;
