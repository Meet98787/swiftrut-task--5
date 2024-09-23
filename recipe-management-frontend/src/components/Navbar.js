import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/" className="text-gray-800 hover:text-blue-500">Recipe App</Link>
        </div>
        <div className="space-x-4">
        {token && <Link to="/create" className="text-gray-800 hover:text-blue-500">Create Recipe</Link>}
          {token && <Link to="/my-recipes" className="text-gray-800 hover:text-blue-500">Show My Recipes</Link>}
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-800 hover:text-blue-500"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
