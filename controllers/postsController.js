const prismaQueries = require("../prisma/prismaQueries");

async function fetchPosts(req, res) {
  try {
    const posts = await prismaQueries.fetchPosts();

    res.json(posts);
  } catch (err) {
    console.error(err);
  }
}

async function fetchSinglePost(req, res) {
  try {
    const post = await prismaQueries.fetchSinglePost(parseInt(req.params.id));

    res.json(post);
  } catch (err) {
    console.error(err);
  }
}

async function createPost(req, res) {
  try {
    const { title, content } = req.body;
    const authorId = parseInt(req.user.id);
    const post = await prismaQueries.createPost(title, content, authorId);
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
  }
}

async function editPost(req, res) {
  try {
    const { title, content } = req.body;
    const authorId = parseInt(req.user.id);
    const postId = parseInt(req.params.id);
    const post = await prismaQueries.fetchSinglePost(postId);
    if (authorId === post.authorId) {
      const editedPost = await prismaQueries.editPost(postId, title, content);
      res.json(editedPost);
    } else {
      return res
        .status(403)
        .json({ message: "Unauthorized to edit this post" });
    }
  } catch (err) {
    console.error(err);
  }
}

async function deletePost(req, res) {
  try {
    const authorId = parseInt(req.user.id);
    const postId = parseInt(req.params.id);
    const post = await prismaQueries.fetchSinglePost(postId);
    if (authorId === post.authorId) {
      const deletedPost = await prismaQueries.deletePost(postId);
      res.json(deletedPost);
    }
  } catch (err) {
    console.error(err);
  }
}

async function editPublishedState(req, res) {
  try {
    const authorId = parseInt(req.user.id);
    const postId = parseInt(req.params.id);
    const post = await prismaQueries.fetchSinglePost(postId);
    if (authorId === post.authorId) {
      const editPublishedStatePost = await prismaQueries.editPublishedState(
        postId,
        post.isPublished
      );
      res.json(editPublishedStatePost);
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
  fetchPosts,
  createPost,
  fetchSinglePost,
  editPost,
  deletePost,
  editPublishedState,
};
