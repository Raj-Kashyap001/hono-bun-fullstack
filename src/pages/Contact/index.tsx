import { FC } from "hono/jsx";
import Layout from "../../components/Layout";

type ContactPageProps = {
  isLoggedIn?: boolean;
  username?: string;
};

const ContactPage: FC<ContactPageProps> = ({
  isLoggedIn = false,
  username = "",
}) => {
  return (
    <Layout title="Contact Us" isLoggedIn={isLoggedIn} username={username}>
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out to us!</p>
      <form action="/api/contact" method="post" class="contact-form">
        <input type="text" name="fullName" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email Address" required />
        <textarea placeholder="Your Message" name="message" required></textarea>
        <button>Send Message</button>
      </form>
    </Layout>
  );
};
export default ContactPage;
