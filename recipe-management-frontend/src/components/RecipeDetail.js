import React, { useEffect, useState } from 'react';
import { getRecipeById } from '../services/recipeService';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await getRecipeById(id);
      setRecipe(data);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {recipe.image && (
        <img
          src={`https://swiftrut-task-5-backend.onrender.com/${recipe.image}`}
          alt={recipe.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">{recipe.title}</h1>
      
      <div className="mb-6 text-center">
        <p className="text-lg font-semibold text-gray-700 mb-2">Ingredients:</p>
        <p className="text-gray-600">{recipe.ingredients.join(', ')}</p>
      </div>

      <div className="mb-6 text-center">
        <p className="text-lg font-semibold text-gray-700 mb-2">Instructions:</p>
        <p className="text-gray-600">{recipe.instructions}</p>
      </div>

      <div className="mb-6 text-center">
        <p className="text-lg font-semibold text-gray-700 mb-2">Cuisine:</p>
        <p className="text-gray-600">{recipe.cuisineType}</p>
      </div>

      <div className="mb-6 text-center">
        <p className="text-lg font-semibold text-gray-700 mb-2">Cooking Time:</p>
        <p className="text-gray-600">{recipe.cookingTime} minutes</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
