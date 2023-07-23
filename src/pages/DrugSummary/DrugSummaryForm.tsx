import { useState } from "react";

import axios from "axios";
import { useFormik } from "formik";
import { useMutation } from "react-query";

import HourglassSpinner from "../../components/HourglassSpinner/HourglassSpinner";

interface FormValues {
  url: string;
  pdf_file: any;
}

const DrugSummaryForm = () => {
  const [summary, setSummary] = useState("");
  const [pdf, setPdf] = useState("");

  const { error, isLoading, mutate } = useMutation(
    async (values: FormValues) => {
      // TODO change this to actual endpoint url when ready
      console.log("values", values);

      const formData = new FormData();
      // formData.append("url", values.url);
      formData.append("pdf", values.pdf_file);
      const res = await axios.post(
        "http://localhost:3001/text_extraction/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log('res', res)
      return res;
    }
  );

  // const handleFileUpload = (even: any) => {
  //   const reader = new FileReader();
  //   const file = event?.target?.files?.[0];
  //   reader.onloadend = () => {
  //     this.setState({
  //       file: reader.result,
  //     });
  //   };
  //   reader.readAsDataURL(file);
  // };

  const { handleChange, handleSubmit, resetForm, setFieldValue, values } =
    useFormik<FormValues>({
      initialValues: {
        url: "",
        pdf_file: "",
      },
      onSubmit: (values) => {
        // console.log({
        //   pdf: values.pdf,
        //   fileName: values.pdf.name,
        //   type: values.pdf.type,
        //   size: `${values.pdf.size} bytes`,
        // });
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
              htmlFor="url"
              className="block text-gray-700 text-sm font-bold mb-2">
              Enter a URL
            </label>
            <input
              id="url"
              name="url"
              type="text"
              onChange={handleChange}
              disabled={!!values.pdf_file}
              value={values.url}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <p className="font-bold mb-4 text-blue-600">OR</p>
          <div className="mb-4">
            <label
              htmlFor="pdf"
              className="block text-gray-700 text-sm font-bold mb-2">
              Upload a PDF
            </label>
            <input
              id="pdf"
              name="pdf_file"
              type="file"
              disabled={!!values.url}
              onChange={handleChange}
              // onChange={(e) => {
              //   const file = e.target?.files?.[0];
              //   if (file !== undefined) {
              //     const fileReader = new FileReader();
              //     fileReader.onloadend = () => {
              //       const pdf = fileReader.result as string;
              //       console.log("base64String", pdf);
              //       // Use the base64String as needed
              //       setPdf(pdf);
              //       // setFieldValue("pdf", pdf);
              //     };
              //     fileReader.readAsDataURL(file);
              //   }
              // }}
              // onChange={(e) => {
              //   console.log('file', e?.currentTarget?.files?.[0])
              //   setFieldValue("file", e?.currentTarget?.files?.[0]);
              // }}
              value={values.pdf_file}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6"></div>

          <div className="flex items-center justify-end">
            <button
              className="black_btn disabled:bg-gray-300 disabled:text-gray-600 disabled:border-gray-300"
              type="submit"
              // disabled={!values.url || isLoading}
            >
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
      </section>
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
    </>
  );
};

export default DrugSummaryForm;
