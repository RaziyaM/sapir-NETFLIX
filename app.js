const express = require('express');
const path = require('path');
const app = express();

const movieRoutes = require('./routes/movie.routes');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // חשוב כדי לקרוא נתונים מ-Forms

app.use('/posts', postRoutes);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', movieRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;