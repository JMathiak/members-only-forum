const db = require("../db/queries");

async function createMessage(req, res) {
  console.log(req.body);
  console.log(req.user);
  await db.createMessage(
    req.body.title,
    req.body.message,
    req.user.userid,
    req.user.username
  );
  res.redirect("/messages");
}

async function getMessagePage(req, res) {
  let messages = await db.getMessages();
  console.log(messages);
  let membership = false;
  if (req.user) {
    membership = req.user.membership;
  }
  console.log(messages.length);
  res.render("messages", {
    user: req.user,
    membershipStatus: membership,
    messages: messages,
  });
}
module.exports = {
  createMessage,
  getMessagePage,
};
