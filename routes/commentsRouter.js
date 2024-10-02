const { Router } = require("express");

const commentsRouter = Router();

commentsRouter.post("/posts/:id/comments", commentsController.createComment);
commentsRouter.delete(
  "/posts/:id/comments/:commentId",
  commentsController.deleteComment
);
