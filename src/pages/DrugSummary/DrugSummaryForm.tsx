import { useFormik } from "formik";
import useSWRMutation from "swr/mutation";
import HourglassSpinner from "../../components/HourglassSpinner/HourglassSpinner";

async function sendRequest(
  url: string,
  { arg }: { arg: { webpage_url: string } }
) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

// TODO: delete react query + axios if not using

const DrugSummaryForm = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "http://localhost:3001/wpextraction",
    sendRequest
  );

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      webpage_url: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await trigger(values /* options */);
        console.log("result", result);
        console.log("data", data);
      } catch (e) {
        console.error(e);
      }
    },
  });
  console.log("data", data);
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
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <HourglassSpinner />
          </div>
        )}
      </section>
    </>
  );
};

export default DrugSummaryForm;
