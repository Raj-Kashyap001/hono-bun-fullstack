import Layout from "../../components/Layout";

const ContactPage = () => {
  return (
    <Layout title="Contact Us">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out to us!</p>
      <form action="/api/contact" method="post" class="contact-form">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email Address" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </Layout>
  );
};
export default ContactPage;
