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
    admin = req.user.admin;
  }
  console.log(messages.length);
  res.render("messages", {
    user: req.user,
    membershipStatus: membership,
    adminStatus: admin,
    messages: messages,
  });
}

async function deleteMessage(req, res) {
  let mID = req.params.id;
  await db.deleteMessage(mID);
  res.redirect("/messages");
}
module.exports = {
  createMessage,
  getMessagePage,
  deleteMessage,
};

/*
delete message route -> /messages/delete/:messageId: 

*/
