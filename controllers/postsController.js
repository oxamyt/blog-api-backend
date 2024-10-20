const prismaQueries = require("../prisma/prismaQueries");

async function fetchPosts(req, res) {
  try {
    const posts = await prismaQueries.fetchPosts();

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}

async function fetchSinglePost(req, res) {
  try {
    const postId = parseInt(req.params.id);
    if (isNaN(postId))
      return res.status(400).json({ message: "Invalid post ID" });
    const post = await prismaQueries.fetchSinglePost(parseInt(postId));

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ message: "Failed to fetch post" });
  }
}

async function createPost(req, res) {
  try {
    const { title, content } = req.body;
    const authorId = parseInt(req.user.id);
    const post = await prismaQueries.createPost(title, content, authorId);
    res.status(201).json(post);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Failed to create post" });
  }
}

async function editPost(req, res) {
  try {
    const { title, content } = req.body;
    const postId = parseInt(req.params.id);

    const post = await prismaQueries.fetchSinglePost(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    const editedPost = await prismaQueries.editPost(postId, title, content);
    res.status(200).json(editedPost);
  } catch (err) {
    console.error("Error editing post:", err);
    res.status(500).json({ message: "Failed to edit post" });
  }
}

async function deletePost(req, res) {
  try {
    const postId = parseInt(req.params.id);
    const post = await prismaQueries.fetchSinglePost(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    const deletedPost = await prismaQueries.deletePost(postId);
    res.status(200).json(deletedPost);
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Failed to delete post" });
  }
}

async function editPublishedState(req, res) {
  try {
    const postId = parseInt(req.params.id);
    const post = await prismaQueries.fetchSinglePost(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const updatedPost = await prismaQueries.editPublishedState(
      postId,
      post.isPublished
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error("Error editing published state:", err);
    res.status(500).json({ message: "Failed to edit post's published state" });
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
