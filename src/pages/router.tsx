import { Hono } from "hono";
import HomePage from "./Home";
import AboutPage from "./About";
import ContactPage from "./Contact";
import ThankYouPage from "./thank-you";

const pagesRouter = new Hono();

pagesRouter.get("/", (c) => {
  return c.html(<HomePage />);
});

pagesRouter.get("/about", (c) => {
  return c.html(<AboutPage />);
});

pagesRouter.get("/contact", (c) => {
  return c.html(<ContactPage />);
});

pagesRouter.get("/thank-you", (c) => {
  const email = c.req.query("email");
  if (!email) {
    return c.redirect("/contact");
  }

  return c.html(<ThankYouPage email={email} />);
});

export default pagesRouter;
