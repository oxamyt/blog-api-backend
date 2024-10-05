const prismaQueries = require("../prisma/prismaQueries");

async function createComment(req, res) {
  try {
    const { content } = req.body;
    const postId = parseInt(req.params.id);
    const authorId = parseInt(req.user.id);
    const comment = await prismaQueries.createComment(
      content,
      postId,
      authorId
    );
    res.json(comment);
  } catch (err) {
    console.error(err);
  }
}

async function deleteComment(req, res) {
  try {
    const authorId = parseInt(req.user.id);
    const commentId = parseInt(req.params.commentId);
    const comment = await prismaQueries.fetchComment(commentId);
    if (authorId === comment.authorId) {
      const deletedComment = await prismaQueries.deleteComment(commentId);
      return res.json(deletedComment);
    } else {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this post" });
    }
  } catch (err) {
    console.error(err);
  }
}

async function fetchComment(req, res) {
  try {
    const commentId = parseInt(req.params.commentId);
    const comment = await prismaQueries.fetchComment(commentId);
    res.json(comment);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createComment,
  fetchComment,
  deleteComment,
};
