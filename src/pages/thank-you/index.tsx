import { FC } from "hono/jsx";
import Layout from "../../components/Layout";

type ThankYouPageProps = {
  email: string;
  isLoggedIn?: boolean;
  username?: string;
};
const ThankYouPage: FC<ThankYouPageProps> = ({
  email,
  isLoggedIn = false,
  username = "",
}) => {
  return (
    <Layout
      title="Contact Form Send"
      isLoggedIn={isLoggedIn}
      username={username}
    >
      <div
        class={"card"}
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "40px auto",
          textAlign: "center",
        }}
      >
        <h1>Thank You!</h1>
        <p>
          We have received your message and will get back to you at
          <strong> {email} </strong>
          soon.
        </p>
        <button onclick="window.history.back()" style={{ marginTop: "20px" }}>
          &lt;- Go Back{" "}
        </button>
      </div>
    </Layout>
  );
};
export default ThankYouPage;
