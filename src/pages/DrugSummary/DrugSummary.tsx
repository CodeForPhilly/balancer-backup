import Welcome from "../../components/Welcome/Welcome.tsx";
import Layout from "../Layout/Layout";
import DrugSummaryForm from "./DrugSummaryForm.tsx";

function DrugLookup() {
  return (
    <Layout>
      <Welcome />
      <DrugSummaryForm />
    </Layout>
  );
}

export default DrugLookup;
