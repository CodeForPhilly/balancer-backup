import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import styles from "./404.module.css";
import Layout from "../Layout/Layout";

// TODO: redesign this page + add official copy?

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
            <span className="font-bold text-red-500">error</span> has occurred:
          </p>
          <p className="mt-4">
            <i className="text-lg font-bold">{error.statusText}</i>
          </p>
        </div>
      </Layout>
    );
  }
  return <p>Unknown error</p>;
}
