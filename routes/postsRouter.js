const { Router } = require("express");
const postsController = require("../controllers/postsController");
const commentsRouter = require("./commentsRouter");
const passport = require("../middlewares/passportConfig");

const postsRouter = Router({ mergeParams: true });

postsRouter.get("/", postsController.fetchPosts);
postsRouter.get("/:id", postsController.fetchSinglePost);

postsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postsController.createPost
);
postsRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsController.editPost
);
postsRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsController.deletePost
);

postsRouter.use("/:id/comments", commentsRouter);

module.exports = postsRouter;
