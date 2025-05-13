const { Router } = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
  deletePostId,
} = require('../controllers/postController');
const { ensureAuthenticated } = require('../controllers/authController');

const postRouter = Router();

postRouter.get('/', getAllPosts);
postRouter.get('/:id', ensureAuthenticated, getPostById);
postRouter.post('/', ensureAuthenticated, createPost);
postRouter.delete('/:id', ensureAuthenticated, deletePostId);

module.exports = postRouter;
