import { html } from "hono/html";
import { FC, ReactNode } from "hono/jsx";
import Navbar from "./Navbar";
type LayoutProps = {
  title: string;
  children: any;
  isLoggedIn?: boolean;
  username?: string;
};
const Layout: FC<LayoutProps> = ({
  title,
  children,
  isLoggedIn = false,
  username = "",
}) => {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <link rel="stylesheet" href="/static/styles.css" />
      </head>
      <body>
        ${(<Navbar isLoggedIn={isLoggedIn} username={username} />)}
        <main>${children}</main>
      </body>
    </html>`;
};
export default Layout;
