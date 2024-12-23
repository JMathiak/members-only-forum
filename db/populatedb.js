const { Client } = require("pg");
require("dontenv").config();

const SQLUsers = `
CREATE TABLE IF NOT EXISTS users (
UserID int NOT NULL AUTO_INCREMENT,
Email VARCHAR(255) PRIMARY KEY,
Username VARCHAR(255),
Password VARCHAR(255),
FirstName MEDIUMTEXT,
LastName MEDIUMTEXT,
Membership BOOL,
Admin BOOL,
UNIQUE (Email, Username)
)
`;

const SQLMessages = `
MessageID int NOT NULL AUTO_INCREMENT,
Title VARCHAR(30),
Message VARCHAR(255),
authorID int,
datePosted DATE
`;

async function main() {
  const client = new Client({
    connectionString: process.env.CONNECTSTRING,
  });
}
