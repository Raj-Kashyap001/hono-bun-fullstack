import { html } from "hono/html";
import { FC, ReactNode } from "hono/jsx";
import Navbar from "./Navbar";
type LayoutProps = {
  title: string;
  children: any;
};
const Layout: FC<LayoutProps> = ({ title, children }) => {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <link rel="stylesheet" href="/static/styles.css" />
      </head>
      <body>
        ${(<Navbar />)}
        <main>${children}</main>
      </body>
    </html>`;
};
export default Layout;
