import { useState } from "react";

import axios from "axios";
import { useFormik } from "formik";
import { useMutation } from "react-query";

import HourglassSpinner from "../../components/HourglassSpinner/HourglassSpinner";

interface FormValues {
  webpage_url: string;
}

const DrugSummaryForm = () => {
  const [summary, setSummary] = useState("");

  const { error, isLoading, mutate } = useMutation(
    async (values: { webpage_url: string }) => {
      // TODO change this to actual endpoint url when ready
      const res = await axios.post(
        "http://localhost:3001/wpextraction",
        values
      );
      return res;
    }
  );

  const { handleChange, handleSubmit, values, resetForm } =
    useFormik<FormValues>({
      initialValues: {
        webpage_url: "",
      },
      onSubmit: (values) => {
        mutate(values, {
          onSuccess: (response) => {
            const message =
              response?.data?.message?.choices?.[0]?.message?.content;
            if (message) setSummary(message);
          },
          onError: () => {
            console.error("An error occured while submitting the form");
          },
          onSettled: () => {
            resetForm();
          },
        });
      },
    });

  // TODO: add more validation around URL input

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
              disabled={!values.webpage_url || isLoading}>
              Submit
            </button>
          </div>
        </form>
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <HourglassSpinner />
          </div>
        )}
        {(error as boolean) && (
          <p className="text-center">Please enter a valid URL.</p>
        )}
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
