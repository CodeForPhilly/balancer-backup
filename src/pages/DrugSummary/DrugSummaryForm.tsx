import { useFormik } from "formik";
import useSWRMutation from "swr/mutation";
import HourglassSpinner from "../../components/HourglassSpinner/HourglassSpinner";
import { useState } from "react";

interface FormValues {
  webpage_url: string;
}

async function sendRequest(url: string, { arg }: { arg: FormValues }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

const DrugSummaryForm = () => {
  const [summary, setSummary] = useState("");

  const { trigger, error, isMutating } = useSWRMutation(
    "http://localhost:3001/wpextraction",
    sendRequest
  );

  const { handleChange, handleSubmit, values, resetForm } =
    useFormik<FormValues>({
      initialValues: {
        webpage_url: "",
      },
      onSubmit: async (values) => {
        setSummary("");
        try {
          const result = await trigger(values /* options */);
          const message = result?.message?.choices?.[0]?.message?.content;
          // console.log("result", result);
          if (message) setSummary(message);
        } catch (e) {
          console.error(e);
        } finally {
          resetForm();
        }
      },
    });

  return (
    <>
      <section className="mt-12 mx-auto w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              htmlFor="search"
              className="block text-gray-700 text-sm font-bold mb-2">
              Enter a URL
            </label>
            <input
              id="webpage_url"
              name="webpage_url"
              type="text"
              onChange={handleChange}
              value={values.webpage_url}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6"></div>

          <div className="flex items-center justify-end">
            <button
              className="black_btn disabled:bg-gray-300 disabled:text-gray-600 disabled:border-gray-300"
              type="submit"
              disabled={!values.webpage_url || isMutating}>
              Submit
            </button>
          </div>
        </form>
        {isMutating && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <HourglassSpinner />
          </div>
        )}
        {error && <p className="text-center">Please enter a valid URL.</p>}
        {summary && (
          <>
            <h2
              style={{ fontSize: "2rem" }}
              className="text-center font-bold my-6">
              URL Summary
            </h2>
            <p>{summary}</p>
          </>
        )}
      </section>
    </>
  );
};

export default DrugSummaryForm;
