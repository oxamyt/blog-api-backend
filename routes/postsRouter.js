const { Router } = require("express");
const postsController = require("../controllers/postsController");
const commentsRouter = require("./commentsRouter");
const passport = require("../middlewares/passportConfig");
const isAdmin = require("../middlewares/isAdmin");

const postsRouter = Router({ mergeParams: true });

postsRouter.get("/", postsController.fetchPosts);
postsRouter.get("/:id", postsController.fetchSinglePost);

postsRouter.post("/", isAdmin, postsController.createPost);
postsRouter.put("/:id", isAdmin, postsController.editPost);
postsRouter.delete("/:id", isAdmin, postsController.deletePost);

postsRouter.use("/:id/comments", commentsRouter);

module.exports = postsRouter;
