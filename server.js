const express = require('express');
const path = require('path');
const fs = require('fs'); // נוסף: מאפשר לקרוא את קובץ ה-JSON מהדיסק
const app = express();
const PORT = 3000;

// 1. הגדרה קריטית: מאפשרת לשרת לקרוא את הנתונים (JSON) שנשלחו ב-fetch
app.use(express.json());

// 2. הגשת הקבצים הסטטיים מתיקיית public (כולל ה-CSS החדש)
app.use(express.static(path.join(__dirname, 'public')));

// 3. פרטי המשתמש התקינים (Hard-coded)
const USER_EMAIL = "admin@test.com";
const USER_PASSWORD = "Password123";

// 4. הגשת עמוד הבית (localhost:3000/)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 5. ראוט חדש: מגיש את קטלוג הסרטים והפרסונות מתוך קובץ ה-JSON
app.get('/api/movies', (req, res) => {
    const jsonPath = path.join(__dirname, 'movies.json');
    
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error("שגיאה בקריאת קובץ הנתונים:", err);
            return res.status(500).json({ error: "לא ניתן לטעון את הנתונים" });
        }
        
        // שליחת האובייקט המלא (catalog ו-personas) כפי שה-HTML מצפה לקבל
        res.json(JSON.parse(data));
    });
});

// 6. הראוט שמטפל בלוגיקה של ההתחברות (Login)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // --- א. ולדיציה בצד השרת ---
    
    // בדיקה שהשדות לא ריקים
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'נא להזין אימייל/מספר טלפון וסיסמה.' });
    }

    // בדיקת ולדיציית אורך סיסמה בשרת (בין 4 ל-60 תווים כמו בצד הלקוח)
    if (password.length < 4 || password.length > 60) {
        return res.status(400).json({ success: false, message: 'הסיסמה חייבת להכיל בין 4 ל-60 תווים.' });
    }

    // בדיקת מבנה אימייל או טלפון בשרת
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanPhone = username.replace(/[-+ ]/g, '');
    const phoneRegex = /^[0-9]{9,15}$/;

    if (!emailRegex.test(username) && !phoneRegex.test(cleanPhone)) {
        return res.status(400).json({ success: false, message: 'נא להזין אימייל או מספר טלפון נייד תקינים.' });
    }

    // --- ב. בדיקת נכונות הנתונים (מול ה-Hard-coded) ---
    if (username === USER_EMAIL && password === USER_PASSWORD) {
        // הפרטים נכונים!
        return res.json({ success: true });
    } else {
        // הפרטים שגויים
        return res.status(401).json({ success: false, message: 'שם המשתמש או הסיסמה שהזנת אינם נכונים.' });
    }
});

// 7. הפעלת השרת
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});