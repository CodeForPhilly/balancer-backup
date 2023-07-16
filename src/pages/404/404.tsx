import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Layout from "../Layout/Layout";
import styles from "./404.module.css";

export default function RouteError() {
  const error = useRouteError();
  console.error(error);
  if (isRouteErrorResponse(error)) {
    return (
      <Layout>
        <div id="error-page" className={styles["error-page"]}>
          <h1 className="text-3xl">Oops! 🫠</h1>
          <p>
            Sorry, an unexpected{" "}
            <span className="text-red-500 font-bold">error</span> has occurred:
          </p>
          <p className="mt-4">
            <i className="font-bold text-lg">{error.statusText}</i>
          </p>
        </div>
      </Layout>
    );
  }
  return <p>Unknown error</p>;
}
