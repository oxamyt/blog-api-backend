const { Router } = require("express");
const postsController = require("../controllers/postsController");
const commentsRouter = require("./commentsRouter");

const postsRouter = Router();

postsRouter.get("/", postsController.fetchPosts);
postsRouter.get("/:id", postsController.fetchSinglePost);
postsRouter.post("/", postsController.createPost);
postsRouter.put("/:id", postsController.editPost);
postsRouter.delete("/:id", postsController.deletePost);

postsRouter.use("/:id/comments", commentsRouter);

module.exports = postsRouter;
