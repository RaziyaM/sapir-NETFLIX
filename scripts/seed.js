const mongoose = require('mongoose');
const Movie = require('../models/movie.model');
const User = require('../models/user.model');

const DB_URL = 'mongodb://localhost:27017/sapirDB';

const initialData = {
  catalog: [
    { title: "דברים מוזרים", desc: "חבורת ילדים בעיירה קטנה מגלה סודות ממשלתיים וכוחות על טבעיים.", likes: 124, liked: false, image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80" },
    { title: "בית הנייר", desc: "שודדים מיומנים מנסים לבצע את השוד הגדול ביותר בהיסטוריה של ספרד.", likes: 350, liked: false, image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=600&q=80" },
    { title: "שובר שורות", desc: "מורה לכימיה מגלה שהוא חולה ומחליט לייצר חומרים אסורים כדי להציל את משפחתו.", likes: 412, liked: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaSxXRgHonweZ_bYTwv_egicVcXwl_m7Yl6tAqfCYULQ&s=10" },
    { title: "משחקי הדיונון", desc: "מאות שחקנים מרוששים מקבלים הזמנה מוזרה להתחרות במשחקי ילדים תמורת פרס עצום.", likes: 298, liked: false, image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80" },
    { title: "מראה שחורה", desc: "סדרת אנתולוגיה המציגה את הצד האפל והמדאיג של הטכנולוגיה המודרנית.", likes: 189, liked: false, image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80" },
    { title: "ונסדיי", desc: "בתם המסתורית של משפחת אדמס יוצאת לחקור תעלומת רצח בבית ספר חדש.", likes: 154, liked: false, image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80" },
    { title: "אירישמן", desc: "סרט פשע אפי בבימויו של מרטין סקורסזה העוקב אחר עולם המאפיה האמריקאי.", likes: 95, liked: false, image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80" },
    { title: "הודעה אדומה", desc: "סוכן של ה-FBI משתף פעולה עם גנב אמנות כדי לתפוס פושעת מתוחכמת.", likes: 210, liked: false, image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80" },
    { title: "בסכינים שלופות", desc: "בלש מתוחכם חוקר את מותו המסתורי של סופר עשיר במשפחה בלתי שגרתית.", likes: 135, liked: false, image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=600&q=80" }
  ]
};

async function seed() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to MongoDB...");
    
    // מחיקה כדי למנוע כפילויות
    await Movie.deleteMany({});
    await User.deleteMany({});
    
    // 1. הכנסת הסרטים ושמירת התוצאה (מערך אובייקטים עם _id אמיתיים)
    const savedMovies = await Movie.insertMany(initialData.catalog);
    
    // 2. הגדרת משתמשים עם הקישורים לסרטים (שימוש ב-_id שמונגו יצר)
    const personas = [
      { username: "Ayala", name: "איילה", consumed: [savedMovies[0]._id, savedMovies[1]._id, savedMovies[5]._id] },
      { username: "Alon", name: "אלון", consumed: [savedMovies[2]._id, savedMovies[3]._id, savedMovies[6]._id] },
      { username: "Adam", name: "אדם", consumed: [savedMovies[1]._id, savedMovies[4]._id, savedMovies[7]._id] },
      { username: "Noa", name: "נועה", consumed: [savedMovies[0]._id, savedMovies[5]._id, savedMovies[8]._id] },
      { username: "Achia", name: "אחיה", consumed: [savedMovies[2]._id, savedMovies[4]._id, savedMovies[7]._id, savedMovies[8]._id] }
    ];
    
    await User.insertMany(personas);
    
    console.log("Data seeded successfully with connections!");
    process.exit();
  } catch (err) {
    console.error("Error seeding:", err);
    process.exit(1);
  }
}

seed();