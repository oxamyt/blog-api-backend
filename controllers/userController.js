const bcrypt = require("bcryptjs");
const prismaQueries = require("../prisma/prismaQueries");
const passport = require("../middlewares/passportConfig");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

async function register(req, res) {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismaQueries.createUser(username, hashedPassword);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error(err);
  }
}

async function login(req, res) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: info.message || "Authentication failed" });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const token = signToken(user);

      return res.status(200).json({ message: "Login successful", token, user });
    });
  })(req, res);
}

async function logout(req, res, next) {
  try {
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).json({ message: "Logout successful" });
      res.redirect("/");
    });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json({ message: "Logout failed" });
  }
}

async function updateRole(req, res) {
  try {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
      const userId = parseInt(req.user.id);
      const updatedUser = await prismaQueries.updateRole(userId);

      const newToken = signToken(updatedUser);

      return res.status(200).json({
        message: "Role updated successfully",
        token: newToken,
      });
    }

    return res.status(403).json({ message: "Wrong Password" });
  } catch (err) {
    console.error("Error during role update:", err);
    res.status(500).json({ message: "Failed to update role" });
  }
}

module.exports = { register, logout, login, updateRole };
