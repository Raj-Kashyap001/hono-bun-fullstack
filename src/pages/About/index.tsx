import { FC } from "hono/jsx";
import Layout from "../../components/Layout";

type AboutPageProps = {
  isLoggedIn?: boolean;
  username?: string;
};

const AboutPage: FC<AboutPageProps> = ({
  isLoggedIn = false,
  username = "",
}) => {
  return (
    <Layout title="About Page" isLoggedIn={isLoggedIn} username={username}>
      <h1>About Us</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam alias
        fugit laudantium commodi, ratione debitis iusto autem soluta expedita
        odio praesentium ipsum, doloribus exercitationem ut ipsa? Assumenda
        error at incidunt explicabo tenetur adipisci.
      </p>
    </Layout>
  );
};
export default AboutPage;
