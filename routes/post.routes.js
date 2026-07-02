const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

// נתיב לשליפת כל הפוסטים (GET /posts)
router.get('/', postController.getAllPosts);

// נתיב ליצירת פוסט חדש (POST /posts)
router.post('/', postController.createPost);

// נתיב למחיקת פוסט לפי ID (POST /posts/delete/:id)
router.post('/delete/:id', postController.deletePost);

module.exports = router;

