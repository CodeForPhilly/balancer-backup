import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { object, string } from "yup";

const LoginSchema = object().shape({
  email: string()
    .email("Please enter a valid email address.")
    .required("Please enter an email address."),
  password: string().required("Please enter a password."),
});

const LoginForm = () => {
  const {
    dirty,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    setErrors,
    touched,
    values,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("values", values);
      try {
        // make login post request here
      } catch (e) {
        // set request errors here
        // setErrors(transformMyApiErrors(e));
      }
    },
    validationSchema: LoginSchema,
  });
  return (
    <>
      <section className="mt-12 mx-auto w-full max-w-xs">
        <h2 className="font-satoshi font-bold text-gray-600 text-xl blue_gradient mb-6">
          Login
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
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <div style={{ height: "1.2rem", paddingTop: ".25rem" }}>
              {touched?.password && errors?.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <a
              className="inline-block align-baseline font-bold text-sm hover:text-blue-600"
              href="register">
              Forgot Password?
            </a>
            <button
              className="black_btn"
              disabled={!(dirty && isValid)}
              type="submit">
              Sign In
            </button>
          </div>
        </form>
      </section>
      <p>
        Don't have an account?{" "}
        <Link to="/register" className="font-bold hover:text-blue-600">
          {" "}
          Register here
        </Link>
        .
      </p>
    </>
  );
};

export default LoginForm;
