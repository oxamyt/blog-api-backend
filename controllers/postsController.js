const { post } = require("../routes/postsRouter");

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
    const post = await prismaQueries.fetchSinglePost(req.params.id);

    res.json(post);
  } catch (err) {
    console.error(err);
  }
}

async function createPost(req, res) {
  try {
    const { title, content } = req.body;
    const authorId = req.user.id;
    const post = await prismaQueries.createPost(title, content, authorId);
    res.redirect("/posts");
  } catch (err) {
    console.error(err);
  }
}

async function editPost(req, res) {
  try {
    const { title, content } = req.body;
    const authorId = req.user.id;
    const postId = req.params.id;
    const post = await prismaQueries.fetchSinglePost(authorId);
    if (req.user.id === post.authorId) {
      const post = await prismaQueries.editPost(postId, title, content);
    }
  } catch (err) {
    console.error(err);
  }
}

async function deletePost(req, res) {
  try {
    const authorId = req.user.id;
    const postId = req.params.id;
    const post = await prismaQueries.fetchSinglePost(authorId);
    if (req.user.id === post.authorId) {
      const post = await prismaQueries.deletePost(postId);
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  fetchPosts,
  fetchSinglePost,
  editPost,
  deletePost,
};
