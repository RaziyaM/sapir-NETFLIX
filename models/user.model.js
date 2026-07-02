const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    consumed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] 
});

module.exports = mongoose.model('User', userSchema);