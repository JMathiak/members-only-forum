const pool = require("./pool");

async function getUsernameMatches(username) {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE username = ($1)`,
    [username]
  );
  return rows;
}

async function getEmailMatches(email) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = ($1)`, [
    email,
  ]);
  return rows;
}

module.exports = {
  getUsernameMatches,
  getEmailMatches,
};
