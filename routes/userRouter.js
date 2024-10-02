const { Router } = require("express");

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
