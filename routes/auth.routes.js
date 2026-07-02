const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// הראוט לטיפול בטופס ה-Login (זה מה שהיה לך)
router.post('/login', authController.login);

// הראוט להצגת עמוד הפרופילים
router.get('/profiles', (req, res) => {
    // כאן תוכל להביא את הנתונים מה-Controller או מה-DB
    const profiles = [
        { name: 'Ayala', avatar: 'profile1.png', color: '#0074e4' },
        { name: 'Alon', avatar: 'profile2.png', color: '#e50914' },
        { name: 'Adam', avatar: 'profile3.png', color: '#800080' },
        { name: 'Noa', avatar: 'profile4.png', color: '#2b5d61' },
        { name: 'Achia', avatar: 'profile5.png', color: '#e87c03' }
    ];

    res.render('profiles', { profiles: profiles });
});

router.get('/menu', (req, res) => {
    const { user, avatar } = req.query;
    res.render('menu', { 
        username: user || 'Ayala', 
        avatar: avatar || 'profile1.png' 
    });
});

module.exports = router;