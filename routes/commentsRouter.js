const { Router } = require("express");
const passport = require("../middlewares/passportConfig");
const commentsController = require("../controllers/commentsController");
const isAdmin = require("../middlewares/isAdmin");

const commentsRouter = Router({ mergeParams: true });

commentsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  commentsController.createComment
);
commentsRouter.put(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentsController.editComment
);
commentsRouter.delete(
  "/:postId/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentsController.deleteComment
);
commentsRouter.get("/:commentId", commentsController.fetchComment);

module.exports = commentsRouter;
