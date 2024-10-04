const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
require("dotenv").config();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
