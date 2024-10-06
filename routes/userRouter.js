const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = Router();
const authenticateJWT = require("../middlewares/authJWT");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);

userRouter.post("/update-role", userController.updateRole);

module.exports = userRouter;
