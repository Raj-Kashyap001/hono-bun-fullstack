# API Application with Database Authentication

A modern Hono application with Bun.sql-based authentication system featuring login and signup functionality.

## Features

- ✅ SQLite database integration using Bun.sql
- ✅ User registration (signup) with email validation
- ✅ Secure login with password hashing
- ✅ Session management with automatic expiration
- ✅ Protected routes requiring authentication
- ✅ User profile page
- ✅ Contact form
- ✅ Responsive navigation

## Installation

```sh
bun install
```

## Running the Application

```sh
bun run dev
```

Open [http://localhost:4000](http://localhost:4000)

## Database

The application uses **Bun.sql** (SQLite) with the following tables:

### Users Table
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email address
- `password_hash` - Hashed password (SHA-256)
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

### Sessions Table
- `id` - Unique session identifier
- `user_id` - Foreign key to users table
- `created_at` - Session creation timestamp
- `expires_at` - Session expiration time (24 hours)

## Authentication Flow

### Signup
1. Navigate to `/signup`
2. Fill in username, email, password, and confirm password
3. Form validates:
   - All fields are required
   - Passwords must match
   - Password minimum 6 characters
   - Valid email format
   - Unique username and email
4. On success, user is automatically logged in and redirected to `/profile`

### Login
1. Navigate to `/login`
2. Enter username and password
3. Credentials validated against database
4. On success, session cookie is created and user redirected to `/profile`

### Logout
1. Click logout button in navbar
2. Session is destroyed
3. Cookie is cleared
4. User redirected to home page

## API Endpoints

### Authentication
- `POST /api/login` - Login with username and password
- `POST /api/signup` - Register new user with username, email, and password
- `POST /api/logout` - Logout current user

### Pages
- `GET /` - Home page
- `GET /login` - Login page
- `GET /signup` - Signup page
- `GET /profile` - User profile (protected)
- `GET /about` - About page
- `GET /contact` - Contact form
- `GET /thank-you` - Thank you page

## Project Structure

```
src/
├── index.ts                 # Main server with API routes
├── components/
│   ├── Layout.tsx          # Base layout wrapper
│   ├── Navbar.tsx          # Navigation bar
│   └── ProtectedLayout.tsx # Protected routes wrapper
├── pages/
│   ├── router.tsx          # Page routing
│   ├── Home/
│   ├── Login/
│   ├── Signup/
│   ├── Profile/
│   ├── About/
│   ├── Contact/
│   └── thank-you/
├── utils/
│   ├── auth.ts             # Authentication utilities
│   └── db.ts               # Database functions
├── types/
│   └── form.ts             # Type definitions
└── static/
    └── styles.css          # Stylesheets
```

## Key Functions

### Authentication (`src/utils/auth.ts`)
- `validateCredentials(username, password)` - Validate user credentials
- `registerUser(username, email, password)` - Register new user
- `createSession(userId)` - Create authenticated session
- `getSession(sessionId)` - Retrieve session data
- `deleteSession(sessionId)` - Destroy session

### Database (`src/utils/db.ts`)
- `initializeDatabase()` - Initialize SQLite schema
- `hashPassword(password)` - Hash password securely
- `verifyPassword(password, hash)` - Verify password hash
- `createUser(username, email, password)` - Create new user
- `validateUserCredentials(username, password)` - Validate login
- `createSession(userId)` - Create session record
- `getSession(sessionId)` - Retrieve session
- `deleteSession(sessionId)` - Delete session

## Security Features

- ✅ Password hashing with SHA-256
- ✅ HttpOnly cookies (prevents XSameSite attacks)
- ✅ 24-hour session expiration
- ✅ Email validation
- ✅ Unique username and email constraints
- ✅ Secure session IDs using crypto.getRandomValues()

## Notes

- Database file (`users.db`) is created automatically in the project root
- Credentials are stored securely in SQLite database (no environment variables needed)
- Sessions are database-backed with automatic expiration
- All passwords are hashed before storage
