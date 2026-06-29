const Post = require('../models/post.model');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.render('posts', { posts }); // שולח ל-View שנקרא posts.ejs
    } catch (err) { res.status(500).send(err.message); }
};

exports.createPost = async (req, res) => {
    try {
        await Post.create(req.body);
        res.redirect('/posts');
    } catch (err) { res.status(400).send(err.message); }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/posts');
    } catch (err) { res.status(500).send(err.message); }
};