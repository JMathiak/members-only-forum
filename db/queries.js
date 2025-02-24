const pool = require("./pool");

async function getUsernameMatches(username) {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE username = ($1)`,
    [username]
  );
  return rows;
}

async function getUserById(id) {
  const { rows } = await pool.query(`SELECT * FROM users where UserID = ($1)`, [
    id,
  ]);
  return rows;
}

async function getEmailMatches(email) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = ($1)`, [
    email,
  ]);
  return rows;
}

async function createUser(username, password, email, firstName, lastName) {
  let boolFalse = false;
  await pool.query(
    `INSERT INTO users (Email, Username, Password, FirstName, LastName, Membership, Admin) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [email, username, password, firstName, lastName, boolFalse, boolFalse]
  );
}

async function giveUserMembership(userID) {
  await pool.query(`UPDATE users SET membership = ($2) WHERE userid = ($1)`, [
    userID,
    true,
  ]);
}
module.exports = {
  getUsernameMatches,
  getUserById,
  getEmailMatches,
  createUser,
  giveUserMembership,
};
