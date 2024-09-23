const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },  // Instructions are required
  cuisineType: { type: String, required: true },   // Cuisine type is required
  cookingTime: { type: String, required: true },   // Cooking time is required
  image: { type: String },                         // Path to uploaded image
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);
