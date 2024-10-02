async function createComment(req, res) {
  try {
    const { content } = req.body;
    const postId = req.params.id;
    const authorId = parseInt(req.user.id);
    const comment = await prismaQueries.createComment(
      content,
      postId,
      authorId
    );
  } catch (err) {
    console.error(err);
  }
}

async function deleteComment(req, res) {
  try {
    const authorId = parseInt(req.user.id);
    const commentId = req.params.commentId;
    const comment = await prismaQueries.fetchComment(commentId);
    if (authorId === comment.authorId) {
      const deletedComment = await prismaQueries.deleteComment(commentId);
    }
  } catch (err) {
    console.error(err);
  }
}
