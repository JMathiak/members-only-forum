const { Client } = require("pg");
require("dotenv").config({ path: "../.env" });
const SQLUsers = `
CREATE TABLE IF NOT EXISTS users (
UserID SERIAL NOT NULL PRIMARY KEY,
Email VARCHAR(255),
Username VARCHAR(255),
Password VARCHAR(255),
FirstName VARCHAR(255),
LastName VARCHAR(255),
Membership BOOL,
Admin BOOL,
UNIQUE (Email, Username)
)
`;

const SQLMessages = `
CREATE TABLE IF NOT EXISTS messages(
MessageID SERIAL NOT NULL PRIMARY KEY,
Title VARCHAR(30),
Message VARCHAR(255),
authorID int,
datePosted DATE
)
`;

const connectString = process.env.CONNECTSTRING;

async function users() {
  const client = new Client({
    connectionString: connectString,
  });
  await client.connect();
  await client.query(SQLMessages);
  await client.end();
  console.log("Done");
}
console.log(connectString);
users();
