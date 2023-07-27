import { useState } from "react";

import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useMutation } from "react-query";

import Summary from "./Summary";

interface FormValues {
  url: string;
  pdf: File | null;
}

const DrugSummaryForm = () => {
  const [summary, setSummary] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { isLoading, mutate } = useMutation(
    async ({ url, pdf }: FormValues) => {
      const formData = new FormData();

      if (url) {
        formData.append("url", url);
      } else if (pdf) {
        formData.append("pdf", pdf);
      }

      const contentType = url ? "application/json" : "multi-part/form";

      try {
        // TODO change this to actual endpoint url once hosted
        const res = await axios.post(
          "http://localhost:3001/text_extraction/",
          formData,
          {
            headers: {
              "Content-Type": contentType,
            },
          }
        );
        return res;
      } catch (e: unknown) {
        console.error(e);
        if (e instanceof AxiosError) {
          const message = e?.response?.data?.error.includes("Invalid")
            ? `Please enter a valid ${url ? "URL" : "PDF"}.`
            : "Something went wrong. Please try again later.";
          setErrorMessage(message);
        } else {
          setErrorMessage("Something went wrong. Please try again later.");
        }
      }
    }
  );

  const { handleChange, handleSubmit, resetForm, setFieldValue, values } =
    useFormik<FormValues>({
      initialValues: {
        url: "",
        pdf: null,
      },
      onSubmit: (values) => {
        setSummary("");
        mutate(values, {
          onSuccess: (response) => {
            const message =
              response?.data?.message?.choices?.[0]?.message?.content;
            if (message) {
              setSummary(message);
            }
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
              disabled={!!values?.pdf}
              value={values.url}
              className={` shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight disabled:bg-gray-200 focus:outline-none focus:shadow-outline`}
            />
          </div>
          <p className="font-bold mb-4 text-blue-600">OR</p>
          <div className="mb-4">
            <label
              id="pdf-label"
              htmlFor="pdf"
              className={`py-2 px-3 w-full text-gray-700 shadow border appearance-none inline-block focus:outline-none hover:cursor-pointer mb-4 leading-tight transition ease-in-out ${
                values.pdf
                  ? "bg-green-200 hover:bg-green-200"
                  : values.url
                  ? "bg-gray-200 hover:cursor-default hover:bg-gray-200"
                  : "bg-white hover:bg-green-100"
              } rounded-md`}>
              {values?.pdf?.name || `Upload a PDF`}
            </label>
            <input
              id="pdf"
              name="pdf"
              type="file"
              disabled={Boolean(values.url)}
              hidden
              onChange={(event) => {
                setFieldValue("pdf", event?.currentTarget?.files?.[0]);
              }}
              // TODO: Replace with custom input component. temporary hack to stay within Formik value state manager.
              value={undefined}
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              className="black_btn disabled:bg-gray-300 disabled:text-gray-600 disabled:border-gray-300"
              type="submit"
              disabled={(!values.url && !values.pdf) || isLoading}>
              Submit
            </button>
          </div>
        </form>
      </section>
      <Summary
        errorMessage={errorMessage}
        isLoading={isLoading}
        summary={summary}
      />
    </>
  );
};

export default DrugSummaryForm;
