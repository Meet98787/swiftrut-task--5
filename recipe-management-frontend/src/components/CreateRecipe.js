import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../services/recipeService';

const CreateRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate to redirect after creation

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients.split(','));
    formData.append('instructions', instructions);
    formData.append('cuisineType', cuisineType);
    formData.append('cookingTime', cookingTime);
    formData.append('image', image);

    try {
      await createRecipe(formData);
      navigate('/my-recipes'); // Redirect to MyRecipes after successful creation
    } catch (err) {
      setError('Error creating recipe');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Recipe</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            placeholder="Recipe Title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Ingredients</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="border p-2 w-full"
            placeholder="Comma separated ingredients"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="border p-2 w-full"
            placeholder="Recipe Instructions"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Cuisine Type</label>
          <input
            type="text"
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
            className="border p-2 w-full"
            placeholder="e.g., Italian, Chinese"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Cooking Time (in minutes)</label>
          <input
            type="text"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className="border p-2 w-full"
            placeholder="e.g., 30"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Upload Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
