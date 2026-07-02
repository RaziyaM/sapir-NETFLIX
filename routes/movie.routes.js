const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');

// הנתיב שאתה משתמש בו לדף ה-HTML
router.get('/movies', movieController.getMovies); 

// נתיב API נקי שיחזיר רק את ה-JSON
router.get('/api/data', movieController.getMoviesJson); 
// ------------------
// בתוך routes/movie.routes.js
router.get('/data', movieController.getMoviesJson);

router.post('/movies/add', movieController.addMovie);
module.exports = router;