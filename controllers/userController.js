const { validationResult } = require("express-validator");
async function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("failure");
  } else {
    res.render("success");
  }
}

module.exports = {
  createUser,
};
