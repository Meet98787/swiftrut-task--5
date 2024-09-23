import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipeById, updateRecipe } from '../services/recipeService';

const EditRecipe = ({ token }) => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cuisineType: '',
    cookingTime: '',
  });
  const navigate = useNavigate(); // Use navigate to redirect after updating

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await getRecipeById(id);
      setRecipeData({
        title: recipe.title,
        ingredients: recipe.ingredients.join(', '),
        instructions: recipe.instructions,
        cuisineType: recipe.cuisineType,
        cookingTime: recipe.cookingTime,
      });
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRecipe = {
        ...recipeData,
        ingredients: recipeData.ingredients.split(','),
      };
      await updateRecipe(id, updatedRecipe, token);
      navigate('/my-recipes'); // Redirect to MyRecipes after successful update
    } catch (error) {
      console.error(error);
      alert('Error updating recipe');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={recipeData.title}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Recipe Title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Ingredients</label>
          <input
            type="text"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Comma separated ingredients"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Instructions</label>
          <textarea
            name="instructions"
            value={recipeData.instructions}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Recipe Instructions"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Cuisine Type</label>
          <input
            type="text"
            name="cuisineType"
            value={recipeData.cuisineType}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="e.g., Italian, Chinese"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Cooking Time (in minutes)</label>
          <input
            type="text"
            name="cookingTime"
            value={recipeData.cookingTime}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="e.g., 30"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
