import { FC } from "hono/jsx";
import Layout from "../../components/Layout";

type LoginPageProps = {
  error?: string;
};

const LoginPage: FC<LoginPageProps> = ({ error }) => {
  return (
    <Layout title="Login Page">
      <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
        <h1>Login</h1>
        {error && (
          <div
            style={{
              padding: "10px",
              marginBottom: "20px",
              backgroundColor: "#f8d7da",
              color: "#721c24",
              borderRadius: "4px",
              border: "1px solid #f5c6cb",
            }}
          >
            {error}
          </div>
        )}
        <form
          method="post"
          action="/api/login"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <div>
            <label
              htmlFor="username"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: "20px", textAlign: "center", color: "#666" }}>
          Demo Credentials: admin / password
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
