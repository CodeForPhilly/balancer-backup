import styles from "./HourglassSpinner.module.css";

function HourglassSpinner() {
  return (
    <div
      className={styles["lds-hourglass"]}
      style={{ borderColor: `#fff transparent #fff transparent` }}></div>
  );
}

export default HourglassSpinner;
