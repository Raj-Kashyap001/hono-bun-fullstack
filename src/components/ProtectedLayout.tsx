import { html } from "hono/html";
import { FC } from "hono/jsx";
import Navbar from "./Navbar";

type ProtectedLayoutProps = {
  title: string;
  children: any;
  isLoggedIn: boolean;
  username: string;
};

const ProtectedLayout: FC<ProtectedLayoutProps> = ({
  title,
  children,
  isLoggedIn,
  username,
}) => {
  if (!isLoggedIn) {
    // Show access denied with auto-redirect
    return html`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Access Denied</title>
          <link rel="stylesheet" href="/static/styles.css" />
          <meta http-equiv="refresh" content="2;url=/login" />
        </head>
        <body>
          ${(<Navbar isLoggedIn={false} />)}
          <main>
            <div style={{ textAlign: "center", padding: "50px" }}>
              <h1>Access Denied</h1>
              <p>You must be logged in to access this page.</p>
              <p>Redirecting to login...</p>
            </div>
          </main>
        </body>
      </html>`;
  }

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

export default ProtectedLayout;
