import { useState } from "react";

import axios from "axios";
import { useFormik } from "formik";
import { useMutation } from "react-query";

import HourglassSpinner from "../../components/HourglassSpinner/HourglassSpinner";

// interface PDF extends Blob {
//   lastModified: number;
//   lastModifiedDate: Date;
//   name: string;
//   size: number;
//   type: string;
//   webkitRelativePath: string;
// }
interface FormValues {
  url: string;
  pdf_file: string;
}

const DrugSummaryForm = () => {
  const [summary, setSummary] = useState("");
  const [pdf, setPdf] = useState<File | null>();
  const [errorMessage, setErrorMessage] = useState("");

  const { isLoading, mutate } = useMutation(async (values: FormValues) => {
    const formData = new FormData();
    formData.append("url", values.url);
    if (pdf) {
      formData.append("pdf", pdf);
    }
    // TODO change this to actual endpoint url when ready
    try {
      const res = await axios.post(
        "http://localhost:3001/text_extraction/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res;
    } catch (e) {
      console.error(e);
    }
  });

  const { handleChange, handleSubmit, resetForm, setFieldValue, values } =
    useFormik<FormValues>({
      initialValues: {
        url: "",
        pdf_file: "",
      },
      onSubmit: (values) => {
        setSummary("");
        setPdf(null);
        mutate(values, {
          onSuccess: (response) => {
            const message =
              response?.data?.message?.choices?.[0]?.message?.content;
            if (message) setSummary(message);
          },
          onError: () => {
            setErrorMessage("An error occured while submitting the form");
          },
          onSettled: () => {
            resetForm();
          },
        });
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
              htmlFor="url"
              className="block text-gray-700 text-sm font-bold mb-2">
              Enter a URL
            </label>
            <input
              id="url"
              name="url"
              type="text"
              onChange={handleChange}
              disabled={!!pdf?.name}
              value={values.url}
              className={`disabled:bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
          </div>
          <p className="font-bold mb-4 text-blue-600">OR</p>
          <div className="mb-4">
            <label
              id="pdf-label"
              htmlFor="pdf_file"
              className={`py-2 px-3 w-full text-gray-700 shadow border appearance-none inline-block focus:outline-none hover:cursor-pointer mb-4 leading-tight transition ease-in-out ${
                pdf?.name
                  ? "bg-green-200 hover:bg-green-200"
                  : values.url
                  ? "bg-gray-200 hover:cursor-default hover:bg-gray-200"
                  : "bg-white hover:bg-green-100"
              } rounded-md`}>
              {pdf?.name || `Upload a PDF`}
            </label>
            <input
              id="pdf_file"
              name="pdf_file"
              type="file"
              disabled={!!values.url}
              hidden
              onChange={(e) => {
                setPdf(e?.currentTarget?.files?.[0]);
              }}
              value={values?.pdf_file}
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              className="black_btn disabled:bg-gray-300 disabled:text-gray-600 disabled:border-gray-300"
              type="submit"
              disabled={(!values.url && !pdf) || isLoading}>
              Submit
            </button>
          </div>
        </form>
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <HourglassSpinner />
          </div>
        )}
        {errorMessage && (
          <p className="text-center">Please enter a valid URL.</p>
        )}
      </section>
      {!isLoading && summary && (
        <>
          <h2
            style={{ fontSize: "2rem" }}
            className="text-center font-bold my-6">
            URL Summary
          </h2>
          <p>{summary}</p>
        </>
      )}
    </>
  );
};

export default DrugSummaryForm;
