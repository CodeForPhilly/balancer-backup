import HourglassSpinner from "../../components/HourglassSpinner/HourglassSpinner";

interface SummaryProps {
  errorMessage: string;
  isLoading: boolean;
  summary: string;
}

function Summary({ errorMessage, isLoading, summary }: SummaryProps) {
  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <HourglassSpinner />
      </div>
    );
  }

  if (errorMessage) {
    return <p className="text-center">{errorMessage}</p>;
  }

  if (!isLoading && summary) {
    return (
      <section className="w-6/12">
        <h2 style={{ fontSize: "2rem" }} className="text-center font-bold my-6">
          Summary
        </h2>
        <p>{summary}</p>
      </section>
    );
  }
}

export default Summary;
