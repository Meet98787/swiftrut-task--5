import React, { useEffect, useState } from 'react';
import { getRecipes } from '../services/recipeService';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]); // All recipes
    const [filteredRecipes, setFilteredRecipes] = useState([]); // Filtered recipes for display
    const [searchQuery, setSearchQuery] = useState(''); // Search query input
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getRecipes();
                setRecipes(data.recipes || []);
                setFilteredRecipes(data.recipes || []); // Initially, display all recipes
            } catch (err) {
                setError('Failed to fetch recipes. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    // Filter recipes based on search query
    useEffect(() => {
        if (!searchQuery) {
            setFilteredRecipes(recipes); // Reset to all recipes when there's no search query
        } else {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = recipes.filter(recipe => 
                recipe.cuisineType.toLowerCase().includes(lowercasedQuery) ||
                recipe.ingredients.some(ingredient => 
                    ingredient.toLowerCase().includes(lowercasedQuery)
                )
            );
            setFilteredRecipes(filtered);
        }
    }, [searchQuery, recipes]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Display loading or error messages if necessary
    if (loading) {
        return <div className="container mx-auto p-6">Loading...</div>;
    }

    if (error) {
        return <div className="container mx-auto p-6 text-red-600">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-center">Our Delicious Recipes</h1>
            
            {/* Search bar */}
            <div className="mb-6 max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Search by ingredients or cuisine type..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                        <div key={recipe._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 ease-in-out">
                            {recipe.image && (
                                <img
                                    src={`http://localhost:5000/${recipe.image}`}
                                    alt={recipe.title}
                                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                                />
                            )}
                            <h2 className="text-2xl font-bold mb-3 text-gray-800">{recipe.title}</h2>
                            <p className="text-gray-600 mb-4">
                                {recipe.ingredients ? recipe.ingredients.join(', ') : 'No ingredients available'}
                            </p>
                            <p className="text-gray-500 mb-4">Cuisine: {recipe.cuisineType}</p>
                            <Link to={`/recipes/${recipe._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
                                View Details
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">No recipes match your search.</div>
                )}
            </div>
        </div>
    );
};

export default RecipeList;
