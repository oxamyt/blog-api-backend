const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function fetchPosts() {
  try {
    return await prisma.post.findMany({
      include: {
        comments: {
          include: {
            author: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw new Error("Could not fetch posts.");
  }
}

async function fetchSinglePost(postId) {
  try {
    return await prisma.post.findUnique({
      where: { id: postId },
      include: {
        comments: {
          include: {
            author: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.error("Error fetching post:", err);
    throw new Error("Could not fetch the post.");
  }
}

async function createPost(title, content, authorId) {
  try {
    return await prisma.post.create({
      data: { title, content, authorId },
    });
  } catch (err) {
    console.error("Error creating post:", err);
    throw new Error("Could not create the post.");
  }
}

async function editPost(postId, title, content) {
  try {
    return await prisma.post.update({
      where: { id: postId },
      data: { title, content },
    });
  } catch (err) {
    console.error("Error editing post:", err);
    throw new Error("Could not edit the post.");
  }
}

async function deletePost(postId) {
  try {
    return await prisma.post.delete({
      where: { id: postId },
    });
  } catch (err) {
    console.error("Error deleting post:", err);
    throw new Error("Could not delete the post.");
  }
}

async function createUser(username, hashedPassword) {
  try {
    return await prisma.user.create({
      data: { username, password: hashedPassword },
    });
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Could not create the user.");
  }
}

async function createComment(content, postId, authorId) {
  try {
    return await prisma.comment.create({
      data: { content, postId, authorId },
    });
  } catch (err) {
    console.error("Error creating comment:", err);
    throw new Error("Could not create the comment.");
  }
}

async function fetchComment(commentId) {
  try {
    return await prisma.comment.findUnique({
      where: { id: commentId },
    });
  } catch (err) {
    console.error("Error fetching comment:", err);
    throw new Error("Could not fetch the comment.");
  }
}

async function deleteComment(commentId) {
  try {
    return await prisma.comment.delete({
      where: { id: commentId },
    });
  } catch (err) {
    console.error("Error deleting comment:", err);
    throw new Error("Could not delete the comment.");
  }
}

async function editComment(commentId, content) {
  try {
    return await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });
  } catch (err) {
    console.error("Error editing comment:", err);
    throw new Error("Could not edit the comment.");
  }
}

async function updateRole(userId) {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: { role: "ADMIN" },
    });
  } catch (err) {
    console.error("Error updating user role:", err);
    throw new Error("Could not update user role.");
  }
}

async function editPublishedState(postId, currentIsPublished) {
  try {
    return await prisma.post.update({
      where: { id: postId },
      data: { isPublished: !currentIsPublished },
    });
  } catch (err) {
    console.error("Error updating post published state:", err);
    throw new Error("Could not update the post's published state.");
  }
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
