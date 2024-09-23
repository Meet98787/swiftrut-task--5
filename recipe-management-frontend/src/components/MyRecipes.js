import React, { useEffect, useState } from 'react';
import { getMyRecipes, deleteRecipe } from '../services/recipeService';
import { Link, useNavigate } from 'react-router-dom';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to view your recipes');
        navigate('/login');
        return;
      }

      try {
        const data = await getMyRecipes(token); // Fetch user-specific recipes
        setRecipes(data);
      } catch (error) {
        setError('Failed to fetch recipes');
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, [navigate]);

  const handleDelete = async (recipeId) => {
    const token = localStorage.getItem('token');
    try {
      await deleteRecipe(recipeId, token);
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId)); // Remove deleted recipe from state
      alert('Recipe deleted successfully');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Failed to delete recipe');
    }
  };

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">My Recipes</h1>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="bg-white rounded-lg shadow-md p-4">
              {recipe.image && (
                <img
                  src={`http://localhost:5000/${recipe.image}`}
                  alt={recipe.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
              <p className="text-gray-700 mb-4">{recipe.ingredients.join(', ')}</p>
              <Link
                to={`/recipes/${recipe._id}/edit`}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(recipe._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-12">
          <p className="text-lg text-gray-500 mb-4">You haven't created any recipes yet.</p>
          <Link
            to="/create"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Your First Recipe
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
