import { FormEvent, ChangeEvent, useEffect, useState } from "react";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { PatientInfo } from "./PatientTypes";
import maxLogo from "../../assets/max.svg";
import minLogo from "../../assets/min.svg";

// TODO: refactor with Formik

export interface NewPatientFormProps {
  patientInfo: PatientInfo;
  setPatientInfo: React.Dispatch<React.SetStateAction<PatientInfo>>;
  allPatientInfo: PatientInfo[];
  setAllPatientInfo: React.Dispatch<React.SetStateAction<PatientInfo[]>>;
  getMedicationInfo: any;
}

const NewPatientForm = ({
  patientInfo,
  setPatientInfo,
  allPatientInfo,
  setAllPatientInfo,
}: NewPatientFormProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const [enterNewPatient, setEnterNewPatient] = useState(true);

  useEffect(() => {
    const patientInfos = localStorage.getItem("patientInfos");
    if (patientInfos) {
      setAllPatientInfo(JSON.parse(patientInfos));
    }
  }, [setAllPatientInfo]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true); // Start loading

    const payload = {
      diagnosis: patientInfo.Diagnosis,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:3001/diagnosis",
        payload
      );

      const generatedGuid = uuidv4();
      const firstFiveCharacters = generatedGuid.substring(0, 5);

      setPatientInfo({ ...patientInfo, ID: firstFiveCharacters });

      if (data) {
        const description = data.message.choices[0].message.content;

        const newDescription = {
          ...patientInfo,
          Description: description,
          ID: firstFiveCharacters,
        };

        const updatedAllPatientInfo = [newDescription, ...allPatientInfo];
        setPatientInfo(newDescription);
        setAllPatientInfo(updatedAllPatientInfo);

        localStorage.setItem(
          "patientInfos",
          JSON.stringify(updatedAllPatientInfo)
        );
      } else {
        console.log("No description came back");
      }
    } catch (error) {
      console.log("Error occurred:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleDiagnosisChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Other") {
      setPatientInfo({
        ...patientInfo,
        Diagnosis: selectedValue,
      });
    } else {
      setPatientInfo({
        ...patientInfo,
        Diagnosis: selectedValue,
        OtherDiagnosis: "", // Reset the OtherDiagnosis value
      });
    }
  };

  const handleClickSummary = () => {
    setEnterNewPatient(!enterNewPatient);
  };

  return (
    <section>
      {/* {search} */}
      <div>
        <br />
        <div className="flex justify-between">
          {enterNewPatient ? (
            <div>
              <h2 className="font-satoshi text-xl font-bold text-gray-600">
                Enter New <span className="blue_gradient">Patient</span>
              </h2>
            </div>
          ) : (
            <div onClick={handleClickSummary}>
              <h2 className="font-satoshi text-xl font-bold text-gray-600 hover:border-b-2 hover:border-blue-600">
                Click To Enter New
                <span className="blue_gradient"> Patient</span>
              </h2>
            </div>
          )}
          <div onClick={handleClickSummary}>
            {enterNewPatient ? (
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
        {enterNewPatient && (
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="font-latoBold block pb-2 text-sm">
                Patient ID:{" "}
              </label>
              <input
                type="text"
                placeholder="Patient ID will be created on submit"
                value={patientInfo.ID}
                readOnly
                className={
                  isLoading
                    ? " url_input_loading peer w-1/2"
                    : "url_input peer w-1/2"
                }
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="diagnosis"
                className="font-latoBold block pb-2 text-sm">
                Diagnosis:
              </label>
              <select
                value={patientInfo.Diagnosis}
                onChange={handleDiagnosisChange}
                required
                className={
                  isLoading
                    ? " url_input_loading peer w-1/2"
                    : "url_input peer w-1/2"
                }>
                <option value="Other">Select a diagnosis</option>
                <option value="Bipolar I mania">Bipolar I mania</option>
                <option value="Bipolar I depression">
                  Bipolar I depression
                </option>
                <option value="Bipolar II hypomania">
                  Bipolar II hypomania
                </option>
                <option value="Bipolar II depression">
                  Bipolar II depression
                </option>
                <option value="Bipolar mixed episodes">
                  Bipolar mixed episodes
                </option>
                <option value="Cyclothymic disorder">
                  Cyclothymic disorder
                </option>
              </select>
              {/* {patientInfo.Diagnosis === "Other" && (
                <input
                  type="text"
                  placeholder="Please specify"
                  value={patientInfo.OtherDiagnosis}
                  onChange={(e) =>
                    setPatientInfo({
                      ...patientInfo,
                      OtherDiagnosis: e.target.value,
                    })
                  }
                  required
                  className="url_input peer"
                />
              )} */}
            </div>
            <div className="mt-5 items-center">
              <label
                htmlFor="currentMedications"
                className="font-latoBold block pb-2 text-sm">
                Current Medications:
              </label>
              <input
                id="currentMedications"
                type="string"
                value={patientInfo.CurrentMedications}
                onChange={(e) =>
                  setPatientInfo({
                    ...patientInfo,
                    CurrentMedications: String(e.target.value),
                  })
                }
                required
                className={
                  isLoading
                    ? " url_input_loading peer w-1/2"
                    : "url_input peer w-1/2"
                }
              />
            </div>

            <div className="mt-5 flex justify-center">
              <button
                type="submit"
                className={`black_btn peer-focus:border-gray-700 peer-focus:text-gray-700 ${
                  isPressed
                    ? ""
                    : "transition-transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-500"
                }${
                  isLoading
                    ? "bg-white-600 scale-105 transition-transform focus:outline-none focus:ring focus:ring-blue-500"
                    : ""
                }`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? ( // Render loading icon if loading
                  <div className="flex items-center">
                    <div className="mr-2 h-4 w-4 animate-ping rounded-full bg-white"></div>
                    <p>Loading...</p>
                  </div>
                ) : (
                  <p>Submit</p>
                )}
              </button>
            </div>
          </form>
        )}
        <br />
      </div>

      {/* {patientInfo.ID && (
        <div>
          <p>ID: {patientInfo.ID}</p>
          <p>Diagnosis: {patientInfo.Diagnosis}</p>
          <p>Description: {patientInfo.Description}</p>
        </div>
      )} */}
    </section>
  );
};

export default NewPatientForm;
