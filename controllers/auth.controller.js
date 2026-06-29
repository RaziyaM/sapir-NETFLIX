const USER_EMAIL = "admin@test.com";
const USER_PASSWORD = "123456";

exports.login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ success: false, message: 'נא להזין פרטים.' });
    
    // כאן תעתיקי את כל הלוגיקה של ה-Validation שהייתה לך ב-server.js המקורי
    if (username === USER_EMAIL && password === USER_PASSWORD) {
        return res.json({ success: true });
    }
    return res.status(401).json({ success: false, message: 'פרטים שגויים.' });
};