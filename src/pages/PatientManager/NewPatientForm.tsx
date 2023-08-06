import { FormEvent, ChangeEvent, useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import { loader } from "../../assets";
import { v4 as uuidv4 } from "uuid";
import { PatientInfo } from "./PatientTypes";
import axios from "axios";
import minLogo from "../../assets/min.svg";
import maxLogo from "../../assets/max.svg";

// TODO: refactor with Formik

export interface NewPatientFormProps {
  patientInfo: PatientInfo;
  setPatientInfo: React.Dispatch<React.SetStateAction<PatientInfo>>;
  allPatientInfo: PatientInfo[];
  setAllPatientInfo: React.Dispatch<React.SetStateAction<PatientInfo[]>>;
}

const NewPatientForm = ({
  setPatientInfo,
  allPatientInfo,
  setAllPatientInfo,
}: NewPatientFormProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const [newPatientInfo, setNewPatientInfo] = useState<PatientInfo>({
    ID: "",
    Diagnosis: "",
    OtherDiagnosis: "",
    Description: "",
    CurrentMedications: "",
    PossibleMedications: { drugs: [] },
  });

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };
  const [enterNewPatient, setEnterNewPatient] = useState(true);

  useEffect(() => {
    const patientInfoFromLocalStorage = JSON.parse(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      localStorage.getItem("patientInfos")
    );

    if (patientInfoFromLocalStorage) {
      setAllPatientInfo(patientInfoFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true); // Start loading

    const payload = {
      diagnosis: newPatientInfo.Diagnosis,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:3001/diagnosis",
        payload
      );

      const drugsResponse = await axios.post(
        "http://localhost:3001/listDrugs",
        payload
      );

      const possibleMedicationsData = drugsResponse.data;

      if (possibleMedicationsData && Array.isArray(possibleMedicationsData)) {
        // Extract drugs property from each object and flatten it into a single array
        const possibleMedicationNames = possibleMedicationsData
          .map((medication: { drugs: string[] }) => medication.drugs)
          .flat();

        setPatientInfo((prev) => ({
          ...prev,
          PossibleMedications: { drugs: possibleMedicationNames },
        }));
      }
      const generatedGuid = uuidv4();
      const firstFiveCharacters = generatedGuid.substring(0, 5);

      setPatientInfo({ ...newPatientInfo, ID: firstFiveCharacters });

      if (data) {
        const description = data.message.choices[0].message.content;

        const newDescription = {
          ...newPatientInfo,
          Description: description,
          ID: firstFiveCharacters,
          PossibleMedications: possibleMedicationsData,
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
      // setPatientInfo((prevPatientInfo) => ({
      //   ...prevPatientInfo,
      //   Diagnosis: "Other",
      //   OtherDiagnosis: "",
      //   CurrentMedications: "",
      //   ID: "",
      // }));
      setEnterNewPatient(false);
      setIsLoading(false); // Stop loading
      handleClickNewPatient();
    }
  };

  const handleDiagnosisChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Other") {
      setNewPatientInfo({
        ...newPatientInfo,
        Diagnosis: selectedValue,
      });
    } else {
      setNewPatientInfo({
        ...newPatientInfo,
        Diagnosis: selectedValue,
        OtherDiagnosis: "", // Reset the OtherDiagnosis value
      });
    }
  };

  const handleClickSummary = () => {
    setNewPatientInfo((prevPatientInfo) => ({
      ...prevPatientInfo,
      Diagnosis: "Other",
      OtherDiagnosis: "",
      CurrentMedications: "",
      ID: "",
    }));
    setEnterNewPatient(!enterNewPatient);
  };

  const handleClickNewPatient = () => {
    setNewPatientInfo((prevPatientInfo) => ({
      ...prevPatientInfo,
      Diagnosis: "Other",
      OtherDiagnosis: "",
      CurrentMedications: "",
      ID: "",
    }));
  };

  return (
    <section>
      {/* {search} */}
      <div>
        <br />
        <div className="flex justify-between">
          {enterNewPatient ? (
            <div onClick={handleClickNewPatient}>
              <h2 className="font-satoshi font-bold cursor-pointer text-gray-600 text-xl  hover:text-blue-600 ">
                Enter New <span className="blue_gradient">Patient</span>
              </h2>
            </div>
          ) : (
            <div onClick={handleClickSummary}>
              <h2 className="font-satoshi font-bold cursor-pointer text-gray-600 text-xl hover:text-blue-600 ">
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
                className="w-7 h-7 sm:w-7 sm:h-7 cursor-pointer hover:border-blue-600 hover:border-b-2"
              />
            ) : (
              <img
                src={maxLogo}
                alt="logo"
                className="w-7 h-7 md:w-7 md:h-7 cursor-pointer hover:border-blue-600 hover:border-b-2"
              />
            )}
          </div>
        </div>
        {enterNewPatient && (
          <form onSubmit={handleSubmit} className="mt-5">
            <div className="flex flex-row justify-between">
              <div className="w-full">
                {newPatientInfo.ID && (
                  <label
                    htmlFor="name"
                    className=" font-latoBold text-sm mr-3 text-gray-500"
                  >
                    Patient ID:
                  </label>
                )}
                <input
                  type="text"
                  placeholder={
                    isLoading
                      ? "Generating patient record"
                      : "Patient ID will be randomly generated on submit"
                  }
                  value={newPatientInfo.ID}
                  readOnly
                  className={
                    isLoading
                      ? " url_input_loading peer w-full"
                      : "text-sm leading-6  font-latoBold  w-full"
                  }
                />
              </div>
              <div
                onClick={handleClickNewPatient}
                className="w-full flex justify-end"
              >
                <label className=" font-latoBold cursor-pointer text-gray-600 text-sm   hover:text-blue-600 ">
                  Clear Form
                </label>
              </div>
            </div>
            <div className="mt-5">
              <label
                htmlFor="diagnosis"
                className="block font-latoBold text-sm pb-2"
              >
                {/* Patient Current State: */}
              </label>
              <select
                value={newPatientInfo.Diagnosis}
                onChange={handleDiagnosisChange}
                required
                className={
                  isLoading
                    ? " url_input_loading peer w-1/2"
                    : "url_input peer w-1/2 "
                }
              >
                <option value="None">Select a Patient Current State:</option>
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
            <div className="items-center mt-5">
              <label
                htmlFor="currentMedications"
                className="block font-latoBold text-sm pb-2"
              >
                {/* Current Medications: */}
              </label>
              <input
                id="currentMedications"
                type="string"
                value={newPatientInfo.CurrentMedications}
                onChange={(e) =>
                  setNewPatientInfo({
                    ...newPatientInfo,
                    CurrentMedications: String(e.target.value),
                  })
                }
                required
                placeholder="Enter Current Medications"
                className={
                  isLoading
                    ? " url_input_loading peer w-1/2"
                    : "url_input peer w-1/2"
                }
              />
            </div>

            <div className="flex justify-center mt-7">
              <button
                type="submit"
                className={`btn w-full ${
                  isPressed &&
                  "transition-transform focus:outline-none focus:ring focus:ring-blue-200"
                }${
                  isLoading
                    ? "transition-transform bg-white-600 focus:outline-none focus:ring focus:ring-blue-500"
                    : ""
                }`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? ( // Render loading icon if loading
                  <div className="flex justify-center  items-center">
                    <div className="w-4 h-4 rounded-full bg-white animate-ping mr-2"></div>
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
