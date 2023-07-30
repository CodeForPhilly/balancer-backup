import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { object, string, ref } from "yup";

const RegistrationSchema = object().shape({
  email: string()
    .email("Please enter a valid email address.")
    .required("Please enter an email address."),
  password: string().required("Please enter a password."),
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
      try {
        // make registration post request here
      } catch (e) {
        // set request errors here
        // setErrors(transformMyApiErrors(e));
      }
    },
    validationSchema: RegistrationSchema,
  });

  return (
    <>
      <section className="mx-auto mt-12 w-full max-w-xs">
        <h2 className="blue_gradient mb-6 font-satoshi text-xl font-bold text-gray-600">
          Register
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
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
            <div className="form-error-container">
              {touched?.password && errors?.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="passwordConfirmation"
              className="mb-2 block text-sm font-bold text-gray-700">
              Password Confirmation
            </label>
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.passwordConfirmation}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
            <div className="form-error-container">
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
