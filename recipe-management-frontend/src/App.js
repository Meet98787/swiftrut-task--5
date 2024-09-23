import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import CreateRecipe from './components/CreateRecipe';
import EditRecipe from './components/EditRecipe';
import RecipeDetail from './components/RecipeDetail';
import Login from './components/Login';
import Register from './components/Register';
import MyRecipes from './components/MyRecipes';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/recipes/:id/edit" element={<EditRecipe />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
