const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function fetchPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

async function fetchSinglePost(postId) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  return post;
}

async function createPost(title, content, authorId) {
  const post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      authorId: authorId,
    },
  });
  return post;
}

async function editPost(postId, title, content) {
  const editedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title: title,
      content: content,
    },
  });
  return editedPost;
}

async function deletePost(postId) {
  const deletedPost = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return deletedPost;
}

async function createUser(username, hashedPassword) {
  const user = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });
}

async function createComment(content, postId, authorId) {
  const comment = await prisma.comment.create({
    data: {
      content: content,
      postId: postId,
      authorId: authorId,
    },
  });
  return comment;
}

async function fetchComment(commentId) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
  return comment;
}

async function deleteComment(commentId) {
  const deletedComment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
  return deletedComment;
}

async function editComment(commentId, content) {
  const editedComment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content: content,
    },
  });
  return editedComment;
}

async function updateRole(userId) {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: "ADMIN",
    },
  });
  return updatedUser;
}

async function editPublishedState(postId, currentIsPublished) {
  const updatedPostPublishedState = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      isPublished: !currentIsPublished,
    },
  });
  return updatedPostPublishedState;
}

module.exports = {
  fetchPosts,
  fetchSinglePost,
  createPost,
  editPost,
  deletePost,
  createUser,
  createComment,
  fetchComment,
  deleteComment,
  editComment,
  updateRole,
  editPublishedState,
};
