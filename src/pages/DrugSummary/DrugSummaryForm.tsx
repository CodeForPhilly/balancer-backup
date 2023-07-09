import { useFormik } from "formik";

const DrugSummaryForm = () => {
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      url: "",
    },
    onSubmit: (values) => {
      console.log("values", values);
      // post search term here
    },
  });
  return (
    <>
      <section className="mt-12 mx-auto w-full max-w-xs">
        <p></p>
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
              id="url"
              name="url"
              type="text"
              onChange={handleChange}
              value={values.url}
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
