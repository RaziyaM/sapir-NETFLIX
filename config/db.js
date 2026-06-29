const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/sapirDB');
        console.log('MongoDB Connected successfully!');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
};
module.exports = connectDB;