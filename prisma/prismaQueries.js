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
}

async function deletePost(postId) {
  const deletedPost = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
}

module.exports = {
  fetchPosts,
  fetchSinglePost,
  createPost,
  editPost,
  deletePost,
};
