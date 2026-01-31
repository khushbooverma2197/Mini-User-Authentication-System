# 🗄️ Supabase Setup Guide

Complete step-by-step guide for setting up your Supabase database.

---

## 📝 Step 1: Create Supabase Account

1. Visit [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign In"**
3. Sign up using:
   - GitHub account (recommended)
   - Google account
   - Email/Password

---

## 🚀 Step 2: Create New Project

1. After login, click **"New Project"**
2. Select or create an **Organization** (if first time, create one)
3. Fill in project details:
   - **Name**: `mini-auth-system` (or any name you prefer)
   - **Database Password**: 
     - Click "Generate a password" OR
     - Create your own strong password
     - ⚠️ **IMPORTANT**: Save this password somewhere safe!
   - **Region**: Choose the closest region to you (e.g., Mumbai, Singapore, etc.)
   - **Pricing Plan**: Free (sufficient for this project)

4. Click **"Create new project"**
5. Wait 1-2 minutes for project initialization

---

## 🗃️ Step 3: Create the `users` Table

### Option A: Using Table Editor (Visual Interface) - RECOMMENDED FOR BEGINNERS

1. In left sidebar, click **"Table Editor"**
2. Click **"Create a new table"** button (green button)
3. In the popup:
   - **Name**: `users`
   - **Description**: (optional) "Stores user authentication data"
   - **Enable Row Level Security (RLS)**: ❌ **UNCHECK THIS** (for development only)

4. **Configure Columns**:

   The first column `id` is automatically created. Configure it:
   - **Name**: `id`
   - **Type**: `uuid`
   - **Default Value**: `gen_random_uuid()`
   - **Primary**: ✅ Check
   - **Is Nullable**: ❌ Uncheck

   Click **"Add column"** for each of these:

   **Column 2: name**
   - **Name**: `name`
   - **Type**: `text`
   - **Default Value**: (leave empty)
   - **Primary**: ❌ Uncheck
   - **Is Nullable**: ❌ Uncheck

   **Column 3: email**
   - **Name**: `email`
   - **Type**: `text`
   - **Default Value**: (leave empty)
   - **Primary**: ❌ Uncheck
   - **Is Unique**: ✅ Check
   - **Is Nullable**: ❌ Uncheck

   **Column 4: age**
   - **Name**: `age`
   - **Type**: `int4`
   - **Default Value**: (leave empty)
   - **Primary**: ❌ Uncheck
   - **Is Nullable**: ❌ Uncheck

   **Column 5: location**
   - **Name**: `location`
   - **Type**: `text`
   - **Default Value**: (leave empty)
   - **Primary**: ❌ Uncheck
   - **Is Nullable**: ❌ Uncheck

   **Column 6: password**
   - **Name**: `password`
   - **Type**: `text`
   - **Default Value**: (leave empty)
   - **Primary**: ❌ Uncheck
   - **Is Nullable**: ❌ Uncheck

   **Column 7: created_at**
   - **Name**: `created_at`
   - **Type**: `timestamptz`
   - **Default Value**: `now()`
   - **Primary**: ❌ Uncheck
   - **Is Nullable**: ❌ Uncheck

5. Click **"Save"** at the bottom

### Option B: Using SQL Editor (For SQL Users)

1. In left sidebar, click **"SQL Editor"**
2. Click **"New query"**
3. Copy and paste this SQL:

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  age INTEGER NOT NULL,
  location TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- Create index on name for faster profile queries
CREATE INDEX idx_users_name ON users(name);
```

4. Click **"Run"** (or press F5)
5. You should see "Success. No rows returned"

---

## 🔑 Step 4: Get Your API Credentials

1. In left sidebar, click **Settings** (gear icon at bottom)
2. Click **"API"** from the settings menu
3. You'll see two important values:

   **A. Project URL**
   - Under "Project URL" section
   - Looks like: `https://xxxxxxxxxxx.supabase.co`
   - Copy this entire URL

   **B. Project API keys**
   - Under "Project API keys" section
   - Find **"anon public"** key
   - Click the **copy icon** to copy the key
   - It's a long string like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

4. **Save both values** - you'll need them in the next step!

---

## ⚙️ Step 5: Configure Your Backend

1. In VS Code, open your project folder
2. Find the file `.env.example`
3. Create a copy and rename it to `.env`
4. Open `.env` and paste your credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-public-key-here
PORT=3000
```

Replace:
- `https://your-project-id.supabase.co` with your actual Project URL
- `your-anon-public-key-here` with your actual anon public key

5. **Save the file**

---

## ✅ Step 6: Verify Setup

### Check Table Structure

1. Go back to Supabase dashboard
2. Click **"Table Editor"** → **"users"**
3. You should see an empty table with 7 columns:
   - id (uuid)
   - name (text)
   - email (text)
   - age (int4)
   - location (text)
   - password (text)
   - created_at (timestamptz)

### Test Connection from Backend

1. Open terminal in VS Code
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start your server:
   ```bash
   npm start
   ```
4. If you see "🚀 Server is running..." - you're good!
5. If you see "Missing Supabase credentials" - check your `.env` file

---

## 🎯 Step 7: Test with Sample Data

### Insert Test User (Manual)

1. In Supabase, go to **Table Editor** → **users**
2. Click **"Insert row"**
3. Fill in:
   - **id**: (leave default - will auto-generate)
   - **name**: `Test User`
   - **email**: `test@example.com`
   - **age**: `25`
   - **location**: `Mumbai`
   - **password**: `temporarypassword` (not hashed - just for testing)
   - **created_at**: (leave default)
4. Click **"Save"**
5. You should see the new row in the table

### Query Test User

Run this SQL query in **SQL Editor**:

```sql
SELECT id, name, email, age, location, created_at 
FROM users 
WHERE name = 'Test User';
```

You should see your test user (notice we're NOT selecting password - good practice!)

---

## 🔒 Security Notes (Important!)

### For Development (Current Setup):
- ✅ RLS (Row Level Security) is **disabled**
- ✅ This allows your API to freely read/write
- ⚠️ Anyone with your API key can access your data

### For Production (Before Going Live):
1. **Enable RLS** on users table:
   ```sql
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ```

2. **Create policies** (example):
   ```sql
   -- Allow signup (insert)
   CREATE POLICY "Allow public signup" 
   ON users FOR INSERT 
   TO public 
   WITH CHECK (true);

   -- Users can only read their own data
   CREATE POLICY "Users can read own data" 
   ON users FOR SELECT 
   TO public 
   USING (auth.uid() = id);
   ```

3. Use Supabase Auth instead of custom password handling

---

## 🐛 Troubleshooting

### Issue: "relation 'users' does not exist"
**Solution**: 
- Make sure you created the table in Step 3
- Check you're looking at the correct project
- Try refreshing the Supabase dashboard

### Issue: "Invalid API key"
**Solution**:
- Verify you copied the **anon public** key (not service_role)
- Check for extra spaces in `.env` file
- Make sure `.env` file is in the root of your project

### Issue: "Could not connect to Supabase"
**Solution**:
- Check your internet connection
- Verify SUPABASE_URL is correct (no trailing slash)
- Make sure project is not paused (free tier can pause)

### Issue: "Insert failed - duplicate key"
**Solution**:
- Email must be unique
- Try with a different email address

---

## 📊 Understanding the Schema

```
users table
├── id (UUID)              → Unique identifier for each user
├── name (TEXT)            → User's full name
├── email (TEXT, UNIQUE)   → User's email (cannot duplicate)
├── age (INTEGER)          → User's age
├── location (TEXT)        → User's city/location
├── password (TEXT)        → Hashed password (bcrypt)
└── created_at (TIMESTAMP) → When account was created
```

---

## 📱 View Your Data

1. **Table Editor**: Visual interface to see rows
2. **SQL Editor**: Run custom queries
3. **API Docs**: Auto-generated API documentation
   - Go to Settings → API
   - Scroll down to see auto-generated API examples

---

## 🎓 Next Steps

After completing setup:
1. ✅ Run your Node.js server: `npm start`
2. ✅ Test the signup endpoint (see TESTING.md)
3. ✅ Test the profile endpoint (see TESTING.md)
4. ✅ Check data in Supabase Table Editor

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)

---

**You're all set! 🎉 Continue to README.md for backend setup.**
