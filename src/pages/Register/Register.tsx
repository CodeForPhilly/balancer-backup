import RegistrationForm from "./RegistrationForm";
import Welcome from "../../components/Welcome/Welcome";
import Layout from "../Layout/Layout";

function Register() {
  return (
    <Layout>
      <Welcome />
      <RegistrationForm />
    </Layout>
  );
}

export default Register;
