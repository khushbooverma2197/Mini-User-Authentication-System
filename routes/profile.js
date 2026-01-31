const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

/**
 * GET /myprofile?name=<name>
 * Fetch user profile by name (excluding password)
 */
router.get('/myprofile', async (req, res) => {
  try {
    const { name } = req.query;

    // Validate that name is provided
    if (!name) {
      return res.status(400).json({
        error: 'Name query parameter is required'
      });
    }

    // Fetch user from Supabase by name
    // Select all fields except password
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, age, location, created_at')
      .eq('name', name)
      .single();

    if (error) {
      // Check if user not found (Bonus feature)
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          error: 'User not found'
        });
      }

      console.error('Supabase error:', error);
      return res.status(500).json({
        error: 'Failed to fetch user profile',
        details: error.message
      });
    }

    // Return user profile (password is NOT included)
    res.status(200).json(data);

  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

module.exports = router;
