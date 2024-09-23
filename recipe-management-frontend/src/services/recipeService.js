import axios from 'axios';

const API_URL = 'http://localhost:5000/api/recipes';

// Get all recipes
export const getRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

// Get recipe by ID
export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    throw error;
  }
};

// Create a new recipe
export const createRecipe = async (formData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
      },
    };
  
    try {
      const response = await axios.post(API_URL, formData, config); // Send FormData to the backend
      return response.data;
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  };
// Update a recipe
export const updateRecipe = async (id, recipeData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found. Please log in.');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.put(`${API_URL}/${id}`, recipeData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};

// Delete a recipe
export const deleteRecipe = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found. Please log in.');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};

// Get recipes created by the logged-in user
export const getMyRecipes = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found. Please log in.');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}/my-recipes`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    throw error;
  }
};
