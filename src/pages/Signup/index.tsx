import { FC } from "hono/jsx";
import Layout from "../../components/Layout";

type SignupPageProps = {
  error?: string;
};

const SignupPage: FC<SignupPageProps> = ({ error }) => {
  return (
    <Layout title="Sign Up">
      <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
        <h1>Create Account</h1>
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
          action="/api/signup"
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
              minlength={3}
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
              htmlFor="email"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
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
              minlength={6}
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
              htmlFor="passwordConfirm"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              required
              minlength={6}
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
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Sign Up
          </button>
        </form>
        <p style={{ marginTop: "20px", textAlign: "center", color: "#666" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#007bff", textDecoration: "none" }}>
            Login here
          </a>
        </p>
      </div>
    </Layout>
  );
};

export default SignupPage;
