const { Router } = require("express");
const baseRouter = Router();

baseRouter.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

baseRouter.get("/messages", (req, res) => {
  res.render("messages", { user: req.user });
});

module.exports = baseRouter;
