const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: String,
    likes: { type: Number, default: 0 },
    liked: { type: Boolean, default: false },
    image: String
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);