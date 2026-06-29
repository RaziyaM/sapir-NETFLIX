const express = require('express');
const path = require('path');
const app = express();

const movieRoutes = require('./routes/movie.routes');
const authRoutes = require('./routes/auth.routes');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', movieRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;