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
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      const { data } = await axios.post(`${baseUrl}/diagnosis`, payload);

      const drugsResponse = await axios.post(`${baseUrl}/listDrugs`, payload);

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
      <div className="p-3 md:p-0">
        <br />
        <div className="flex justify-between">
          {enterNewPatient ? (
            <div onClick={handleClickNewPatient}>
              <h2 className="cursor-pointer font-satoshi text-xl font-bold text-gray-600  hover:text-blue-600 ">
                Enter New <span className="blue_gradient">Patient</span>
              </h2>
            </div>
          ) : (
            <div onClick={handleClickSummary}>
              <h2 className="cursor-pointer font-satoshi text-xl font-bold text-gray-600 hover:text-blue-600 ">
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
                className="h-7 w-7 cursor-pointer hover:border-b-2 hover:border-blue-600 sm:h-7 sm:w-7"
              />
            ) : (
              <img
                src={maxLogo}
                alt="logo"
                className="h-7 w-7 cursor-pointer hover:border-b-2 hover:border-blue-600 md:h-7 md:w-7"
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
                    className=" font-latoBold mr-3 text-sm text-gray-500"
                  >
                    Patient ID:
                  </label>
                )}
                {isLoading && (
                  <input
                    type="text"
                    placeholder={isLoading ? "Generating record" : ""}
                    value={newPatientInfo.ID}
                    readOnly
                    className={
                      isLoading
                        ? " url_input_loading peer w-full"
                        : "font-latoBold w-full text-sm leading-6"
                    }
                  />
                )}
              </div>
              <div
                onClick={handleClickNewPatient}
                className="flex w-full justify-end"
              >
                <label className=" font-latoBold cursor-pointer text-sm text-gray-400   hover:text-blue-600 ">
                  Clear Form
                </label>
              </div>
            </div>
            <div className="mt-5">
              <label
                htmlFor="diagnosis"
                className="font-latoBold block pb-2 text-sm"
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
            <div className="mt-5 items-center">
              <label
                htmlFor="currentMedications"
                className="font-latoBold block pb-2 text-sm"
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

            <div className="mt-7 flex justify-center">
              <button
                type="submit"
                className={`btn w-full ${
                  isPressed &&
                  "transition-transform focus:outline-none focus:ring focus:ring-blue-200"
                }${
                  isLoading
                    ? "bg-white-600 transition-transform focus:outline-none focus:ring focus:ring-blue-500"
                    : ""
                }`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? ( // Render loading icon if loading
                  <div className="flex items-center  justify-center">
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
