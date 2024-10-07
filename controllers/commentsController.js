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
    return res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create comment" });
  }
}

async function deleteComment(req, res) {
  try {
    const authorId = parseInt(req.user.id);
    const commentId = parseInt(req.params.commentId);
    const comment = await prismaQueries.fetchComment(commentId);
    if (authorId === comment.authorId) {
      const deletedComment = await prismaQueries.deleteComment(commentId);
      return res.status(200).json(deletedComment);
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
    return res.json(comment);
  } catch (err) {
    console.error(err);
  }
}

async function editComment(req, res) {
  try {
    const { content } = req.body;
    const authorId = parseInt(req.user.id);
    const commentId = parseInt(req.params.commentId);
    const comment = await prismaQueries.fetchComment(commentId);
    if (authorId === comment.authorId) {
      const editedComment = await prismaQueries.editComment(commentId, content);
      return res.status(201).json(editedComment);
    } else {
      return res
        .status(403)
        .json({ message: "Unauthorized to edit this post" });
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createComment,
  fetchComment,
  deleteComment,
  editComment,
};
