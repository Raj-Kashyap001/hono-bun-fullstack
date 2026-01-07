import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import HomePage from "./Home";
import AboutPage from "./About";
import ContactPage from "./Contact";
import ThankYouPage from "./thank-you";
import LoginPage from "./Login";
import SignupPage from "./Signup";
import ProfilePage from "./Profile";
import ProtectedLayout from "../components/ProtectedLayout";
import { getSession } from "../utils/auth";

const pagesRouter = new Hono();

// Helper to get session info from request
const getAuthInfo = (c: any) => {
  const sessionId = getCookie(c, "sessionId");
  const session = sessionId ? getSession(sessionId) : null;
  return {
    isLoggedIn: !!session,
    username: session?.username || "",
    sessionId,
  };
};

pagesRouter.get("/", (c) => {
  const { isLoggedIn, username } = getAuthInfo(c);
  return c.html(<HomePage isLoggedIn={isLoggedIn} username={username} />);
});

pagesRouter.get("/about", (c) => {
  const { isLoggedIn, username } = getAuthInfo(c);
  return c.html(<AboutPage isLoggedIn={isLoggedIn} username={username} />);
});

pagesRouter.get("/contact", (c) => {
  const { isLoggedIn, username } = getAuthInfo(c);
  return c.html(<ContactPage isLoggedIn={isLoggedIn} username={username} />);
});

pagesRouter.get("/thank-you", (c) => {
  const email = c.req.query("email");
  if (!email) {
    return c.redirect("/contact");
  }

  const { isLoggedIn, username } = getAuthInfo(c);
  return c.html(
    <ThankYouPage email={email} isLoggedIn={isLoggedIn} username={username} />
  );
});

pagesRouter.get("/login", (c) => {
  const { isLoggedIn } = getAuthInfo(c);
  const error = c.req.query("error");

  // If already logged in, redirect to profile
  if (isLoggedIn) {
    return c.redirect("/profile");
  }

  return c.html(<LoginPage error={error} />);
});

pagesRouter.get("/signup", (c) => {
  const { isLoggedIn } = getAuthInfo(c);
  const error = c.req.query("error");

  // If already logged in, redirect to profile
  if (isLoggedIn) {
    return c.redirect("/profile");
  }

  return c.html(<SignupPage error={error} />);
});

pagesRouter.get("/profile", (c) => {
  const { isLoggedIn, username } = getAuthInfo(c);

  return c.html(
    <ProtectedLayout
      title="Profile"
      isLoggedIn={isLoggedIn}
      username={username}
    >
      <ProfilePage username={username} />
    </ProtectedLayout>
  );
});

export default pagesRouter;
