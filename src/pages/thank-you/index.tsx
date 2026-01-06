import { FC } from "hono/jsx";
import Layout from "../../components/Layout";

type ThankYouPageProps = {
  email: string;
};
const ThankYouPage: FC<ThankYouPageProps> = ({ email }) => {
  return (
    <Layout title="Contact Form Send">
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
          We have received your message and will get back to you at {email}{" "}
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
