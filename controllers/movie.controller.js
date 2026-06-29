const fs = require('fs');
const path = require('path');

exports.getMovies = (req, res) => {
    const jsonPath = path.join(__dirname, '../movies.json');
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "לא ניתן לטעון נתונים" });
        res.json(JSON.parse(data));
    });
};