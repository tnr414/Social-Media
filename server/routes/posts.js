const express = require('express');
const { getPost, getPosts, createPost, updatePost, deletePost, likePost, commentPost, getPostsBySearch } = require('../controllers/posts');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/search', getPostsBySearch)
router.post('/', auth, createPost);
router.patch('/:id',auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);


module.exports = router;
