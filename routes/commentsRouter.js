const { Router } = require("express");
const passport = require("../middlewares/passportConfig");
const commentsController = require("../controllers/commentsController");
const {
  validateComment,
  handleValidationErrors,
} = require("../middlewares/validation");

const commentsRouter = Router({ mergeParams: true });

commentsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateComment,
  handleValidationErrors,
  commentsController.createComment
);
commentsRouter.put(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  validateComment,
  handleValidationErrors,
  commentsController.editComment
);
commentsRouter.delete(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentsController.deleteComment
);
commentsRouter.get("/:commentId", commentsController.fetchComment);

module.exports = commentsRouter;
