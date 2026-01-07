import { FC } from "hono/jsx";
import Layout from "../../components/Layout";
import Card from "../../components/Card";

type HomePageProps = {
  isLoggedIn?: boolean;
  username?: string;
};

const HomePage: FC<HomePageProps> = ({ isLoggedIn = false, username = "" }) => {
  return (
    <Layout title="Home Page" isLoggedIn={isLoggedIn} username={username}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main content of the home page.</p>

      <Card title="Card 1" content="This is the content of card 1." />
      <Card title="Card 2" content="This is the content of card 2." />
    </Layout>
  );
};
export default HomePage;
