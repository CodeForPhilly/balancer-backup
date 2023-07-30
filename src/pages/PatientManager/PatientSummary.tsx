import { useState } from "react";

import { PatientInfo } from "./PatientTypes";
// import { loader } from "../../assets";
import maxLogo from "../../assets/max.svg";
import minLogo from "../../assets/min.svg";

interface PatientSummaryProps {
  patientInfo: PatientInfo;
  getMedicationInfo: any;
  loader: any;
}

const PatientSummary = ({
  patientInfo,
  getMedicationInfo,
  loader,
}: PatientSummaryProps) => {
  const [showSummary, setShowSummary] = useState(true);

  const handleClickSummary = () => {
    setShowSummary(!showSummary);
  };

  return (
    <div className="my-1 flex max-w-full items-center">
      {getMedicationInfo.isFetching ? (
        <img src={loader} alt="loader" className="h-20 w-20 object-contain" />
      ) : getMedicationInfo.error ? (
        <p className="text-center font-inter font-bold text-black">
          Well, that wasn't supposed to happen...
          <br />
          <span className="font-satoshi font-normal text-gray-700">
            {getMedicationInfo.error?.data?.error}
          </span>
        </p>
      ) : (
        patientInfo.Description && (
          <div
            className="flex flex-col gap-3 whitespace-normal break-words"
            style={{ width: "670px" }}>
            <div className="flex justify-between">
              <div>
                <h2 className="font-satoshi text-xl font-bold text-gray-600">
                  Patient <span className="blue_gradient">Summary</span>
                </h2>
              </div>
              <div onClick={handleClickSummary}>
                {showSummary ? (
                  <img
                    src={minLogo}
                    alt="logo"
                    className="hover:border-b-2 hover:border-blue-600 md:h-7 md:w-7"
                  />
                ) : (
                  <img
                    src={maxLogo}
                    alt="logo"
                    className="hover:border-b-2 hover:border-blue-600 md:h-7 md:w-7"
                  />
                )}
              </div>
            </div>
            {showSummary && (
              <div className="summary_box">
                <p className="font-inter text-sm font-medium text-gray-700">
                  <label
                    htmlFor="patientID"
                    className="font-latoBold block pb-2 text-sm">
                    {" "}
                    <b>Patient ID: </b> {patientInfo.ID}
                  </label>
                  <label
                    htmlFor="diagnosis"
                    className="font-latoBold block pb-2 text-sm">
                    <b>Diagnosis: </b> {patientInfo.Diagnosis}{" "}
                    {patientInfo.OtherDiagnosis}
                  </label>
                  <label
                    htmlFor="ageInput"
                    className="font-latoBold block pb-2 text-sm">
                    {" "}
                    <b>Current Medications: </b>
                    {patientInfo.CurrentMedications}
                  </label>
                  <label
                    htmlFor="currentMedications"
                    className="font-latoBold block pb-2 text-sm">
                    <b>Possible Medications: </b>
                    <br />
                    <br />
                    <p className="whitespace-pre-wrap font-inter text-sm font-medium text-gray-700">
                      <pre
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          maxWidth: "100%",
                          overflow: "auto",
                          whiteSpace: "pre-wrap",
                          wordWrap: "break-word",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: patientInfo.Description,
                        }}></pre>
                      {/* {patientInfo.Description} */}
                    </p>
                  </label>
                </p>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default PatientSummary;
