import LoginForm from "./LoginForm";
import Welcome from "../../components/Welcome/Welcome";
import Layout from "../Layout/Layout";

function Login() {
  return (
    <Layout>
      <Welcome />
      <LoginForm />
    </Layout>
  );
}

export default Login;
