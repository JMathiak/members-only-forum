const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
require("dotenv").config();
const db = require("./db/queries");
const pool = require("./db/pool");
const bcrypt = require("bcryptjs");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM users WHERE username = ($1)`,
        [username]
      );
      const user = rows[0];
      console.log(user);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.userid);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM users where UserID = ($1)`,
      [id]
    );
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});
const baseRouter = require("./routes/baseRoutes.js");
app.use("/", baseRouter);

const userRouter = require("./routes/userRoutes.js");
app.use("/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express is now listening on port ${PORT}`));
