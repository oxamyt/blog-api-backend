const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require("../middlewares/passportConfig");

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);

userRouter.post(
  "/update-role",
  passport.authenticate("jwt"),
  userController.updateRole
);

module.exports = userRouter;
