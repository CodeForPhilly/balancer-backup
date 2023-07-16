import DrugSummaryForm from "./DrugSummaryForm.tsx";
import Welcome from "../../components/Welcome/Welcome.tsx";
import Layout from "../Layout/Layout";

function DrugLookup() {
  return (
    <Layout>
      <Welcome />
      <DrugSummaryForm />
    </Layout>
  );
}

export default DrugLookup;
