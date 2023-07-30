import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { object, string } from "yup";

const LoginSchema = object().shape({
  email: string()
    .email("Please enter a valid email address.")
    .required("Please enter an email address."),
  password: string().required("Please enter a password."),
});

// TODO: make re-usable Form and FormItem components

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
      <section className="mx-auto mt-12 w-full max-w-xs">
        <h2 className="blue_gradient mb-6 font-satoshi text-xl font-bold text-gray-600">
          Login
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
            />
            <div className="form-error-container">
              {touched?.email && errors?.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <div className="form-error-container">
              {touched?.password && errors?.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              className="inline-block align-baseline text-sm font-bold hover:text-blue-600"
              to="register">
              Forgot Password?
            </Link>
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
