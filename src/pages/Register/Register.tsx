import Welcome from "../../components/Welcome/Welcome";
import Layout from "../Layout/Layout";
import RegistrationForm from "./RegistrationForm";

function Register() {
  return (
    <Layout>
      <Welcome />
      <RegistrationForm />
    </Layout>
  );
}

export default Register;
