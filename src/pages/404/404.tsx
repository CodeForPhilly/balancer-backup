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
          <h1 className="text-xl">Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText}</i>
          </p>
        </div>
      </Layout>
    );
  }
  return <p>Unknown error</p>;
}
