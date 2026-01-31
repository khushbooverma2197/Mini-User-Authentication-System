# Mini User Authentication System

A simple User Authentication API built with **Node.js**, **Express**, and **Supabase (PostgreSQL)**.

## 📋 Features

- ✅ User signup with password hashing (bcrypt)
- ✅ Fetch user profile by name
- ✅ Secure password storage (never returned in API)
- ✅ Duplicate email prevention
- ✅ Input validation
- ✅ Proper error handling

---

## 🗄️ Part 1: Supabase Database Setup

### Step 1: Create a Supabase Account & Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Project Name**: mini-auth-system (or any name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
5. Click **"Create new project"** and wait for setup to complete

### Step 2: Create the `users` Table

1. In your Supabase dashboard, go to **Table Editor** (left sidebar)
2. Click **"Create a new table"**
3. Configure the table:
   - **Name**: `users`
   - **Enable Row Level Security (RLS)**: ❌ Uncheck for now (for development)

4. **Add the following columns:**

| Column Name | Data Type | Default Value | Primary | Constraints |
|------------|-----------|---------------|---------|-------------|
| `id` | `uuid` | `gen_random_uuid()` | ✅ Yes | NOT NULL |
| `name` | `text` | - | ❌ No | NOT NULL |
| `email` | `text` | - | ❌ No | NOT NULL, UNIQUE |
| `age` | `int4` | - | ❌ No | NOT NULL |
| `location` | `text` | - | ❌ No | NOT NULL |
| `password` | `text` | - | ❌ No | NOT NULL |
| `created_at` | `timestamptz` | `now()` | ❌ No | NOT NULL |

5. Click **"Save"**

### Step 3: Alternative - Use SQL Editor

You can also create the table using SQL. Go to **SQL Editor** and run:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  age INTEGER NOT NULL,
  location TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
```

### Step 4: Get Your Supabase Credentials

1. In Supabase dashboard, click **Settings** (gear icon) → **API**
2. Find and copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

---

## 🚀 Part 2: Backend Setup

### Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install:
- `express` - Web framework
- `@supabase/supabase-js` - Supabase client
- `bcrypt` - Password hashing
- `dotenv` - Environment variables
- `nodemon` - Auto-restart server (dev dependency)

### Step 2: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```

2. Open `.env` and add your Supabase credentials:
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_KEY=your-anon-public-key-here
   PORT=3000
   ```

### Step 3: Start the Server

```bash
npm start
```

Or for development (auto-restart on changes):
```bash
npm run dev
```

You should see:
```
🚀 Server is running on http://localhost:3000
📌 Endpoints:
   POST http://localhost:3000/signup
   GET  http://localhost:3000/myprofile?name=<name>
```

---

## 🧪 Part 3: Testing the API

### Option 1: Using Thunder Client (VS Code Extension)

1. Install **Thunder Client** extension in VS Code
2. See detailed tests in `TESTING.md`

### Option 2: Using Postman

1. Download and install [Postman](https://www.postman.com/downloads/)
2. Create a new collection: "User Auth API"
3. Follow test cases in `TESTING.md`

### Option 3: Using PowerShell (Command Line)

#### Test 1: Signup a User

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/signup" -Method POST -ContentType "application/json" -Body '{"name":"Ravi","email":"ravi@gmail.com","age":22,"location":"Bangalore","password":"123456"}'
```

**Expected Response:**
```json
{
  "message": "User registered successfully"
}
```

#### Test 2: Try Duplicate Email (Should Fail)

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/signup" -Method POST -ContentType "application/json" -Body '{"name":"Ravi2","email":"ravi@gmail.com","age":25,"location":"Mumbai","password":"abcdef"}'
```

**Expected Response:**
```json
{
  "error": "Email already registered"
}
```

#### Test 3: Fetch User Profile

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/myprofile?name=Ravi" -Method GET
```

**Expected Response:**
```json
{
  "id": "some-uuid",
  "name": "Ravi",
  "email": "ravi@gmail.com",
  "age": 22,
  "location": "Bangalore",
  "created_at": "2026-01-31T..."
}
```

#### Test 4: User Not Found

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/myprofile?name=NonExistent" -Method GET
```

**Expected Response:**
```json
{
  "error": "User not found"
}
```

---

## 📁 Project Structure

```
mini-user-authentication-system/
├── config/
│   └── supabase.js          # Supabase client configuration
├── routes/
│   ├── signup.js            # POST /signup endpoint
│   └── profile.js           # GET /myprofile endpoint
├── .env                     # Environment variables (DO NOT COMMIT)
├── .env.example             # Environment template
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
├── server.js               # Main server file
├── README.md               # This file
└── TESTING.md              # Detailed testing guide
```

---

## ✅ Requirements Checklist

### Database
- ✅ Users table with all required columns
- ✅ UUID primary key auto-generated
- ✅ Email unique constraint
- ✅ Timestamp with default NOW()

### Signup API
- ✅ Validates all fields are provided
- ✅ Validates email format
- ✅ Hashes password using bcrypt
- ✅ Stores user in Supabase
- ✅ Prevents duplicate emails
- ✅ Returns success message

### Profile API
- ✅ Fetches user by name query parameter
- ✅ Returns user details WITHOUT password
- ✅ Returns 404 if user not found
- ✅ Proper error handling

### Code Quality
- ✅ Uses Supabase JS Client
- ✅ Uses bcrypt for password hashing
- ✅ Uses async/await
- ✅ Proper try/catch error handling
- ✅ Password NEVER returned in any API

### Bonus Features
- ✅ Prevent duplicate email signup
- ✅ Return 404 if user does not exist
- ✅ Basic input validation (email format, required fields)

---

## 🔒 Security Notes

1. **Never commit `.env` file** to Git (it's in `.gitignore`)
2. **Passwords are hashed** using bcrypt before storing
3. **Passwords are never returned** in any API response
4. For production, enable **Row Level Security (RLS)** in Supabase

---

## 🐛 Troubleshooting

### Error: "Missing Supabase credentials"
- Make sure `.env` file exists and contains valid `SUPABASE_URL` and `SUPABASE_KEY`

### Error: "relation 'users' does not exist"
- Verify the `users` table was created in Supabase
- Check you're using the correct project

### Error: "Failed to register user"
- Check Supabase dashboard for table permissions
- Ensure RLS is disabled for development

### Port already in use
- Change `PORT` in `.env` file
- Or stop other apps using port 3000

---

## 📚 Next Steps

1. Add login functionality with JWT tokens
2. Implement password update feature
3. Add email verification
4. Implement refresh tokens
5. Add rate limiting
6. Enable RLS in Supabase for production

---

## 📝 License

ISC

---

**Happy Coding! 🎉**
