const asyncHandler = require('express-async-handler');
const {
  queryAllPosts,
  queryPostById,
  queryCreatePost,
  queryDeletePostById,
} = require('../db/queries');

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await queryAllPosts();
  res.status(200).json(posts);
});

const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await queryPostById(id);
  if (!post) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'There is no post with this id.' });
  }
  res.status(200).json(post);
});

const createPost = asyncHandler(async (req, res) => {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'All fields are required' });
  }

  const newPost = await queryCreatePost(title, content, userId);
  res.status(201).json(newPost);
});

const deletePostId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await queryDeletePostById(id);
  if (!post) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'There is no post with this id.' });
  }

  res.status(200).json(post);
});

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePostId,
};
