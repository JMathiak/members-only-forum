const { Router } = require("express");
const baseRouter = Router();
const messageController = require("../controllers/messageController.js");
const db = require("../db/queries");

baseRouter.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

baseRouter.get("/messages", messageController.getMessagePage);

baseRouter.post("/messages/create", messageController.createMessage);
module.exports = baseRouter;
