import { FC } from "hono/jsx";

type ProfilePageProps = {
  username?: string;
};

const ProfilePage: FC<ProfilePageProps> = ({ username = "User" }) => {
  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <h1>Profile Page</h1>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Welcome, {username}!</h2>
        <p>
          <strong>Username:</strong> {username}
        </p>
        <p>
          <strong>Account Status:</strong> Active
        </p>
        <p>
          <strong>Login Date:</strong> {new Date().toLocaleDateString()}
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default ProfilePage;
