const { Router } = require("express");
const commentsController = require("../controllers/commentsController");

const commentsRouter = Router({ mergeParams: true });

commentsRouter.post("/", commentsController.createComment);
commentsRouter.get("/:commentId", commentsController.fetchComment);
commentsRouter.delete("/:postId/:commentId", commentsController.deleteComment);

module.exports = commentsRouter;
