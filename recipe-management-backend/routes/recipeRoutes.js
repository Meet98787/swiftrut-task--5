const express = require('express');
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getMyRecipes
} = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');

const router = express.Router();

// Protected Routes (Require Authentication)
router.get('/my-recipes', authMiddleware, getMyRecipes); // Get recipes by the logged-in user (should be before /:id)

// Public Routes
router.get('/', getRecipes); // Get all recipes
router.get('/:id', getRecipeById); // Get a recipe by ID

// Protected Routes (Require Authentication)
router.post('/', authMiddleware, upload.single('image'), createRecipe);
router.put('/:id', authMiddleware, updateRecipe); // Update a recipe
router.delete('/:id', authMiddleware, deleteRecipe); // Delete a recipe

module.exports = router;
