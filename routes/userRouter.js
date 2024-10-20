const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require("../middlewares/passportConfig");
const {
  validateRegistration,
  handleValidationErrors,
} = require("../middlewares/validation");

const userRouter = Router();

userRouter.post(
  "/register",
  validateRegistration,
  handleValidationErrors,
  userController.register
);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);

userRouter.post(
  "/update-role",
  passport.authenticate("jwt"),
  userController.updateRole
);

userRouter.post(
  "/get-user",
  passport.authenticate("jwt"),
  userController.getUser
);

module.exports = userRouter;
