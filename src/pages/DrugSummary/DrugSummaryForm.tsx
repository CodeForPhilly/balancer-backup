import axios from "axios";
import { useFormik } from "formik";
import { useMutation } from "react-query";

const DrugSummaryForm = () => {
  const mutation = useMutation({
    mutationFn: (values: { webpage_url: string }) => {
      return axios.post("http://localhost:3001/wpextraction", values);
    },
  });
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      webpage_url: "",
    },
    onSubmit: (values) => {
      mutation.mutate(values, {
        onSuccess: () => {
          alert("Form submitted successfully");
        },
        onError: (response) => {
          console.log("An error occured while submiting the form");
          console.log(response);
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
            <button className="black_btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default DrugSummaryForm;
