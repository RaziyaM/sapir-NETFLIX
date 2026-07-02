const Movie = require('../models/movie.model');
const User = require('../models/user.model');

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        const users = await User.find();
        res.render('movies', { movies, users });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.addMovie = async (req, res) => {
    try {
        // יצירת סרט חדש מהנתונים שהגיעו מהטופס
        const newMovie = new Movie({
            title: req.body.title,
            desc: req.body.desc,
            image: req.body.image,
            likes: 0, // ברירת מחדל
            liked: false
        });
        
        await newMovie.save();
        res.redirect('/api/movies'); // חזרה לדף לאחר ההוספה
    } catch (err) {
        res.status(400).send("שגיאה בהוספת הסרט: " + err.message);
    }
};

exports.getDataJson = async (req, res) => {
    try {
        const movies = await Movie.find({});
        const users = await User.find({});
        // מחזירים רק נתונים נקיים
        res.json({ catalog: movies, personas: users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMoviesJson = async (req, res) => {
    try {
        const movies = await Movie.find({});
        const users = await User.find({});
        // מחזירים אובייקט JSON טהור
        res.json({ catalog: movies, personas: users });
    } catch (err) {
        res.status(500).json({ error: "שגיאה בשרת" });
    }
};