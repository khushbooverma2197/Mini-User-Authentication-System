const express = require('express');
const bcrypt = require('bcrypt');
const supabase = require('../config/supabase');

const router = express.Router();

/**
 * POST /signup
 * Register a new user
 */
router.post('/signup', async (req, res) => {
  try {
    const { name, email, age, location, password } = req.body;

    // Validate that all fields are provided
    if (!name || !email || !age || !location || !password) {
      return res.status(400).json({
        error: 'All fields are required: name, email, age, location, password'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Validate age
    if (typeof age !== 'number' || age <= 0) {
      return res.status(400).json({
        error: 'Age must be a positive number'
      });
    }

    // Check if email already exists (Bonus feature)
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(409).json({
        error: 'Email already registered'
      });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store the user in Supabase
    console.log('📝 Attempting to insert user into Supabase...');
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          age,
          location,
          password: hashedPassword
        }
      ])
      .select();

    if (error) {
      console.error('❌ Supabase error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({
        error: 'Failed to register user',
        details: error.message || error.toString()
      });
    }

    console.log('✅ User registered successfully');
    // Return success response
    res.status(201).json({
      message: 'User registered successfully'
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

module.exports = router;
