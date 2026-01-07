import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { setCookie, getCookie } from "hono/cookie";
import pagesRouter from "./pages/router";
import { ContactFormData } from "./types/form";
import {
  validateCredentials,
  createSession,
  deleteSession,
  getSession,
  registerUser,
} from "./utils/auth";
import { initializeDatabase } from "./utils/db";

const app = new Hono();

// Initialize database on startup
initializeDatabase();

app.use(logger());

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.use("/static/*", serveStatic({ root: "src/" }));

// Login API endpoint
app.post("/api/login", async (c) => {
  const formData = await c.req.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return c.redirect("/login?error=Username and password are required");
  }

  const result = await validateCredentials(username, password);

  if (!result.success || !result.userId) {
    return c.redirect(
      "/login?error=" +
        encodeURIComponent(result.error || "Invalid credentials")
    );
  }

  // Create session with userId
  const sessionId = createSession(result.userId);

  // Set session cookie
  setCookie(c, "sessionId", sessionId, {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: "Lax",
    maxAge: 24 * 60 * 60, // 24 hours
  });

  return c.redirect("/profile");
});

// Signup API endpoint
app.post("/api/signup", async (c) => {
  const formData = await c.req.formData();
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  // Validation
  if (!username || !email || !password || !passwordConfirm) {
    return c.redirect(
      "/signup?error=" + encodeURIComponent("All fields are required")
    );
  }

  if (password !== passwordConfirm) {
    return c.redirect(
      "/signup?error=" + encodeURIComponent("Passwords do not match")
    );
  }

  if (password.length < 6) {
    return c.redirect(
      "/signup?error=" +
        encodeURIComponent("Password must be at least 6 characters")
    );
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return c.redirect(
      "/signup?error=" + encodeURIComponent("Invalid email address")
    );
  }

  // Register user
  const result = await registerUser(username, email, password);

  if (!result.success || !result.userId) {
    return c.redirect(
      "/signup?error=" +
        encodeURIComponent(result.error || "Registration failed")
    );
  }

  // Create session and log in user
  const sessionId = createSession(result.userId);

  setCookie(c, "sessionId", sessionId, {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: "Lax",
    maxAge: 24 * 60 * 60, // 24 hours
  });

  return c.redirect("/profile");
});

// Logout API endpoint
app.post("/api/logout", (c) => {
  const sessionId = getCookie(c, "sessionId");

  if (sessionId) {
    deleteSession(sessionId);
  }

  // Clear the session cookie
  setCookie(c, "sessionId", "", {
    httpOnly: true,
    maxAge: 0,
  });

  return c.redirect("/");
});

app.route("/", pagesRouter);

app.post("/api/contact", async (c) => {
  const formdata = await c.req.formData();

  return c.redirect("/thank-you?email=" + formdata.get("email"));
});

export default app;
