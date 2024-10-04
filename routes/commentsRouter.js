const { Router } = require("express");
const commentsController = require("../controllers/commentsController");

const commentsRouter = Router();

commentsRouter.post("/:postId", commentsController.createComment);
commentsRouter.delete("/:postId/:commentId", commentsController.deleteComment);

module.exports = commentsRouter;
