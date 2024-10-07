const { Router } = require("express");
const postsController = require("../controllers/postsController");
const commentsRouter = require("./commentsRouter");
const passport = require("../middlewares/passportConfig");
const isAdmin = require("../middlewares/isAdmin");

const postsRouter = Router({ mergeParams: true });

postsRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  postsController.fetchPosts
);
postsRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsController.fetchSinglePost
);

postsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  postsController.createPost
);
postsRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  postsController.editPost
);
postsRouter.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  postsController.editPublishedState
);
postsRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  postsController.deletePost
);

postsRouter.use("/:id/comments", commentsRouter);

module.exports = postsRouter;
