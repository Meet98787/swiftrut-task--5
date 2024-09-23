const Recipe = require('../models/Recipe');

// Create a new recipe
exports.createRecipe = async (req, res) => {
    const { title, ingredients, instructions, cuisineType, cookingTime } = req.body;
  
    try {
      const recipe = new Recipe({
        title,
        ingredients,
        instructions,
        cuisineType,
        cookingTime,
        author: req.user,
        image: req.file ? req.file.path : null // Save image path if uploaded
      });
  
      const savedRecipe = await recipe.save();
      res.status(201).json({ message: 'Recipe created successfully', recipe: savedRecipe });
    } catch (error) {
      res.status(500).json({ message: 'Error creating recipe', error: error.message });
    }
  };

// Get all recipes
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ message: 'Recipes retrieved successfully', recipes });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving recipes', error: error.message });
  }
};

// Get recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving recipe', error: error.message });
  }
};


// Update recipe
exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions, cuisineType, cookingTime } = req.body;

  try {
    const recipe = await Recipe.findById(id);

    // Ensure the recipe exists
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Ensure the logged-in user is the owner of the recipe
    if (recipe.author.toString() !== req.user) {
      return res.status(403).json({ message: 'Not authorized to update this recipe' });
    }

    // Update the recipe fields
    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.cuisineType = cuisineType || recipe.cuisineType;
    recipe.cookingTime = cookingTime || recipe.cookingTime;

    // Save the updated recipe
    const updatedRecipe = await recipe.save();
    res.json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe', error: error.message });
  }
};

// Delete recipe
exports.deleteRecipe = async (req, res) => {
    const { id } = req.params;
  
    try {
      const recipe = await Recipe.findById(id);
  
      // Ensure the recipe exists
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      // Ensure the logged-in user is the owner of the recipe
      if (recipe.author.toString() !== req.user) {
        return res.status(403).json({ message: 'Not authorized to delete this recipe' });
      }
  
      // Use deleteOne instead of remove
      await recipe.deleteOne();
      res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting recipe', error: error.message });
    }
  };

// Get recipes created by the logged-in user
exports.getMyRecipes = async (req, res) => {
  try {
    // Fetch all recipes where the author is the logged-in user
    const recipes = await Recipe.find({ author: req.user });
    if (recipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found for this user' });
    }
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user recipes', error: error.message });
  }
};