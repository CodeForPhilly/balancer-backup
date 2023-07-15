import Welcome from "../../components/Welcome/Welcome";
import Layout from "../Layout/Layout";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <Layout>
      <Welcome />
      <LoginForm />
    </Layout>
  );
}

export default Login;
