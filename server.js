const app = require('./app');
const connectDB = require('./config/db'); // ייבוא הפונקציה שיצרנו
const PORT = 3000;

// חיבור ל-DB ואז הרצת השרת
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});