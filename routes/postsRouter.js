const { Router } = require("express");
const postsController = require("../controllers/postsController");
const commentsRouter = require("./commentsRouter");
const passport = require("../middlewares/passportConfig");
const isAdmin = require("../middlewares/isAdmin");
const authenticateJWT = require("../middlewares/authJWT");

const postsRouter = Router({ mergeParams: true });

postsRouter.get("/", passport.authenticate("jwt"), postsController.fetchPosts);
postsRouter.get(
  "/:id",
  passport.authenticate("jwt"),
  postsController.fetchSinglePost
);

postsRouter.post(
  "/",
  passport.authenticate("jwt"),
  isAdmin,
  postsController.createPost
);
postsRouter.put(
  "/:id",
  passport.authenticate("jwt"),
  isAdmin,
  postsController.editPost
);
postsRouter.delete(
  "/:id",
  passport.authenticate("jwt"),
  isAdmin,
  postsController.deletePost
);

postsRouter.use("/:id/comments", commentsRouter);

module.exports = postsRouter;
