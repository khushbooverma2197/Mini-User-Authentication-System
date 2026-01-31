const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Please check your .env file.');
}

console.log('🔧 Supabase Configuration:');
console.log('   URL:', supabaseUrl);
console.log('   Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'MISSING');

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
