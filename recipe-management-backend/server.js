const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);      // User Authentication Routes
app.use('/api/recipes', recipeRoutes);
app.use('/uploads', express.static('uploads')); // Recipe Routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
