//JavaScript
const mongoose = require('mongoose');

// Define the Schema (the blueprint)
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: Number,
    createdAt: { type: Date, default: Date.now }
});


// Create and export the Model
module.exports = mongoose.model('Book', bookSchema);
