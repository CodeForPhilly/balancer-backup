import { FormEvent, ChangeEvent, useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import { loader } from "../../assets";
import { v4 as uuidv4 } from "uuid";
import { PatientInfo } from "./PatientTypes";
import axios from "axios";

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
    Diagnosis: "Bipolar I mania",
    OtherDiagnosis: "",
    Description: "",
    CurrentMedications: "None",
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

    setNewPatientInfo({
      ...newPatientInfo,
      Diagnosis: selectedValue,
      OtherDiagnosis: "", // Reset the OtherDiagnosis value
    });
  };

  const handleClickSummary = () => {
    setNewPatientInfo((prevPatientInfo) => ({
      ...prevPatientInfo,
      Diagnosis: "",
      OtherDiagnosis: "",
      CurrentMedications: "",
      ID: "",
    }));
    setEnterNewPatient(!enterNewPatient);
  };

  const handleClickNewPatient = () => {
    setNewPatientInfo((prevPatientInfo) => ({
      ...prevPatientInfo,
      Diagnosis: "",
      OtherDiagnosis: "",
      CurrentMedications: "",
      ID: "",
    }));
  };

  return (
    <section>
      {/* {search} */}
      <div className="mx-3 md:mx-0 md:p-0">
        <br />
        <div className="flex justify-between">
          {enterNewPatient ? (
            <div onClick={handleClickNewPatient}>
              <h2 className="header_logo cursor-pointer font-satoshi text-xl font-bold text-gray-600  hover:text-blue-600 ">
                Enter Patient Details
                {/* <span className="blue_gradient">Details</span> */}
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
          <div
            onClick={handleClickSummary}
            className="m-2 cursor-pointer items-center"
          >
            {enterNewPatient ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 12h12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            )}
          </div>
        </div>
        {enterNewPatient && (
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="summary_box  ">
              <div className="mt-5">
                <label
                  htmlFor="current-state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Current state
                </label>
                <div className="mt-2 ">
                  <select
                    value={newPatientInfo.Diagnosis}
                    onChange={handleDiagnosisChange}
                    required
                    autoComplete="current-state"
                    className={
                      isLoading ? " url_input_loading w-1/2" : "dropdown "
                    }
                  >
                    <option value="Bipolar I mania"> Bipolar I mania </option>
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
                </div>
              </div>
              <div className="mt-5 items-center  justify-center">
                {/* <label
                  htmlFor="currentMedications"
                  className=" flex cursor-pointer"
                > */}
                {/* Current Medications: */}
                <label
                  htmlFor="current-state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Current medications
                </label>
                <input
                  id="currentMedications"
                  type="ani_input"
                  value={newPatientInfo.CurrentMedications}
                  onChange={(e) =>
                    setNewPatientInfo({
                      ...newPatientInfo,
                      CurrentMedications: String(e.target.value),
                    })
                  }
                  required
                  placeholder=""
                  className={
                    isLoading
                      ? " url_input_loading peer w-1/2"
                      : "ani_input peer mt-2 w-1/2"
                  }
                />
                {/* <span className="text-gray-500 font-satoshi text-sm font-medium  text-opacity-80 bg-white absolute left-4 top-2 px-1 transition duration-200 input-text">
                    Current Medications
                  </span> */}
                {/* </label> */}
              </div>

              <div className="mt-7 flex justify-end">
                <div className="flex w-full justify-end">
                  <button
                    type="button"
                    className="btnCancel mr-5"
                    onClick={handleClickNewPatient}
                  >
                    Clear Form
                  </button>
                </div>
                <button
                  type="submit"
                  className={`btn  ${
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
