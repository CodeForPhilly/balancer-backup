import DrugSummaryForm from "./DrugSummaryForm.tsx";
import Welcome from "../../components/Welcome/Welcome.tsx";
import Layout from "../Layout/Layout";

function DrugLookup() {
  return (
    <Layout>
      <Welcome
        subHeader="Drug Summary"
        descriptionText="Get a condensed summary for a clinical drug trial and/or study. "
      />
      <DrugSummaryForm />
    </Layout>
  );
}

export default DrugLookup;
