const db = require("../db/queries");

async function createMessage(req, res) {
  console.log(req.body.message);
  res.redirect("/messages");
}

module.exports = {
  createMessage,
};
