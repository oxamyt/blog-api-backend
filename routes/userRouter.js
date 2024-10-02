const { Router } = require("express");

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/login",
  })
);
userRouter.post("/logout", userController.logout);

module.exports = userRouter;
