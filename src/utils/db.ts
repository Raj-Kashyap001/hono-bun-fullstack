import { Database } from "bun:sqlite";

// Initialize SQLite database
const dbPath = "users.db";
export const db = new Database(dbPath);

// Enable foreign keys
db.run("PRAGMA foreign_keys = ON");

// Initialize database schema
export function initializeDatabase() {
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create sessions table
  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  console.log("Database initialized successfully");
}

// Hash password using Bun's built-in crypto
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

// Verify password - simple comparison (for production, use bcrypt)
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const computedHash = await hashPassword(password);
  return computedHash === hash;
}

// Get user by username
export function getUserByUsername(username: string) {
  const user = db
    .query("SELECT * FROM users WHERE username = ?")
    .get(username) as any;
  return user || null;
}

// Get user by email
export function getUserByEmail(email: string) {
  const user = db
    .query("SELECT * FROM users WHERE email = ?")
    .get(email) as any;
  return user || null;
}

// Get user by ID
export function getUserById(id: number) {
  const user = db.query("SELECT * FROM users WHERE id = ?").get(id) as any;
  return user || null;
}

// Create new user
export async function createUser(
  username: string,
  email: string,
  password: string
): Promise<{ success: boolean; userId?: number; error?: string }> {
  try {
    // Check if user already exists
    if (getUserByUsername(username)) {
      return { success: false, error: "Username already taken" };
    }

    if (getUserByEmail(email)) {
      return { success: false, error: "Email already registered" };
    }

    const passwordHash = await hashPassword(password);

    const insert = db
      .prepare(
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)"
      )
      .run(username, email, passwordHash);

    return { success: true, userId: insert.lastInsertRowid as number };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Validate user credentials
export async function validateUserCredentials(
  username: string,
  password: string
): Promise<{ success: boolean; userId?: number; error?: string }> {
  const user = getUserByUsername(username);

  if (!user) {
    return { success: false, error: "Invalid username or password" };
  }

  const isValid = await verifyPassword(password, user.password_hash);

  if (!isValid) {
    return { success: false, error: "Invalid username or password" };
  }

  return { success: true, userId: user.id };
}

// Generate secure random ID
function generateSecureId(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

// Create session
export function createSession(userId: number): string {
  const sessionId = generateSecureId();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  db.prepare(
    "INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)"
  ).run(sessionId, userId, expiresAt);

  return sessionId;
}

// Get session
export function getSession(sessionId: string) {
  const session = db
    .query(
      `SELECT s.*, u.username FROM sessions s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`
    )
    .get(sessionId) as any;

  return session || null;
}

// Delete session
export function deleteSession(sessionId: string): void {
  db.prepare("DELETE FROM sessions WHERE id = ?").run(sessionId);
}

// Clean up expired sessions (optional maintenance)
export function cleanupExpiredSessions(): void {
  db.prepare("DELETE FROM sessions WHERE expires_at < datetime('now')").run();
}
