import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { object, string, ref } from "yup";

const RegistrationSchema = object().shape({
  email: string()
    .email("Invalid email")
    .required("Please enter an email address."),
  password: string().required("Please enter a password"),
  passwordConfirmation: string()
    .oneOf([ref("password"), undefined], "Passwords must match")
    .required("Please confirm password."),
});

const LoginForm = () => {
  const {
    dirty,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    touched,
    values,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: (values) => {
      console.log("values", values);
      // make registration post request here.
    },
    validationSchema: RegistrationSchema,
  });

  console.log("errors", errors);
  console.log("touched", touched);
  return (
    <>
      <section className="mt-12 mx-auto w-full max-w-xs">
        <h2 className="font-satoshi font-bold text-gray-600 text-xl blue_gradient mb-6">
          Register
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
            />
            <div style={{ height: "1.2rem", paddingTop: ".25rem" }}>
              {touched?.email && errors?.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div style={{ height: "1.2rem", paddingTop: ".25rem" }}>
              {touched?.password && errors?.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="passwordConfirmation"
              className="block text-gray-700 text-sm font-bold mb-2">
              Password Confirmation
            </label>
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.passwordConfirmation}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div style={{ height: "1.2rem", paddingTop: ".25rem" }}>
              {touched?.passwordConfirmation &&
                errors?.passwordConfirmation && (
                  <p className="text-sm text-red-500">
                    {errors.passwordConfirmation}
                  </p>
                )}
            </div>
          </div>

          <button
            className="black_btn ml-auto block"
            disabled={!(dirty && isValid)}
            type="submit">
            Register
          </button>
        </form>
      </section>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="font-bold hover:text-blue-600">
          {" "}
          Login here.
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
