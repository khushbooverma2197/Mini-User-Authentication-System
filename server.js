const express = require('express');
require('dotenv').config();

const signupRoutes = require('./routes/signup');
const profileRoutes = require('./routes/profile');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', signupRoutes);
app.use('/', profileRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Mini User Authentication System API',
    endpoints: {
      signup: 'POST /signup',
      profile: 'GET /myprofile?name=<name>'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Something went wrong!',
    details: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📌 Endpoints:`);
  console.log(`   POST http://localhost:${PORT}/signup`);
  console.log(`   GET  http://localhost:${PORT}/myprofile?name=<name>`);
});

module.exports = app;
