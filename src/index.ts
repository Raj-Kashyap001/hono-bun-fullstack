import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import pagesRouter from "./pages/router";
import { ContactFormData } from "./types/form";

const app = new Hono();

app.use(logger());

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.use("/static/*", serveStatic({ root: "src/" }));

app.route("/", pagesRouter);

app.post("/api/contact", async (c) => {
  console.log("Contact form submission:", await c.req.parseBody());
  return c.redirect("/thank-you?email=");
});

export default {
  fetch: app.fetch,
  port: 4000,
};
