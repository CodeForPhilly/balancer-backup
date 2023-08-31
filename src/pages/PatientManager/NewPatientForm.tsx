import { FormEvent, ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PatientInfo } from "./PatientTypes";
import axios from "axios";
import Tooltip from "./Tooltip";

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
    Diagnosis: "Manic",
    OtherDiagnosis: "",
    Description: "",
    CurrentMedications: "",
    PriorMedications: "",
    PossibleMedications: { drugs: [] },
    Mania: "False",
    Depression: "False",
    Hypomania: "False",
    Psychotic: "No",
    Suicide: "No",
    Kidney: "No",
    Liver: "No",
    weight_gain: "No",
    blood_pressure: "No",
    Reproductive: "No",
    risk_pregnancy: "No",
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
      diagnosis:
        newPatientInfo.Diagnosis !== null ? newPatientInfo.Diagnosis : "manic",
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
      ID: "",
      Diagnosis: "Manic",
      OtherDiagnosis: "",
      Description: "",
      CurrentMedications: "",
      PriorMedications: "",
      PossibleMedications: { drugs: [] },
      Mania: "False",
      Depression: "False",
      Hypomania: "False",
      Psychotic: "No",
      Suicide: "No",
      Kidney: "No",
      Liver: "No",
      weight_gain: "No",
      blood_pressure: "No",
      Reproductive: "No",
      risk_pregnancy: "No",
    }));
    setEnterNewPatient(!enterNewPatient);
  };

  const handleClickNewPatient = () => {
    setNewPatientInfo((prevPatientInfo) => ({
      ...prevPatientInfo,
      ID: "",
      Diagnosis: "Manic",
      OtherDiagnosis: "",
      Description: "",
      CurrentMedications: "",
      PriorMedications: "",
      PossibleMedications: { drugs: [] },
      Mania: "False",
      Depression: "False",
      Hypomania: "False",
      Psychotic: "No",
      Suicide: "No",
      Kidney: "No",
      Liver: "No",
      weight_gain: "No",
      blood_pressure: "No",
      Reproductive: "No",
      risk_pregnancy: "No",
    }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checkboxName: string
  ) => {
    const isChecked = e.target.checked;
    setNewPatientInfo((prevInfo) => ({
      ...prevInfo,
      [checkboxName]: isChecked ? "True" : "False", // Update for both checked and unchecked
    }));
  };

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    radioName: string
  ) => {
    const selectedValue = e.target.value;
    setNewPatientInfo((prevInfo) => ({
      ...prevInfo,
      [radioName]: selectedValue,
    }));
  };

  return (
    <section className="flex items-center justify-center">
      {/* {search} */}
      <div className="mx-3 md:mx-0 md:p-0">
        <br />
        <div className="flex w-[870px] justify-between">
          {enterNewPatient ? (
            <div onClick={handleClickNewPatient}>
              <h2 className="header_logo cursor-pointer font-satoshi text-xl font-bold text-gray-600  hover:text-blue-600 ">
                Enter Patient Details
                {/* <span className="blue_gradient">Details</span> */}
              </h2>
            </div>
          ) : (
            <div onClick={handleClickSummary}>
              <h2 className="header_logo cursor-pointer font-satoshi text-xl font-bold text-gray-600  hover:text-blue-600  ">
                Click To Enter New Patient
              </h2>
            </div>
          )}
          <div
            onClick={handleClickSummary}
            className=" cursor-pointer items-center"
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
          <form onSubmit={handleSubmit} className="mt-2 ">
            <div className="summary_box  ">
              <div className=" flex items-center border-b border-gray-900/10 py-6  ">
                <div className="w-[300px]">
                  <label
                    htmlFor="current-state"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Current state
                  </label>
                </div>
                <div className="w-[500px] pl-16">
                  <select
                    value={newPatientInfo.Diagnosis}
                    onChange={handleDiagnosisChange}
                    required
                    autoComplete="current-state"
                    className={isLoading ? " url_input_loading" : "dropdown"}
                  >
                    <option value="Manic"> Manic </option>
                    <option value="Depressed">Depressed</option>
                    <option value="Hypomanic">Hypomanic</option>
                    <option value="Euthymic">Euthymic</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>
              </div>

              <div className="border-b border-gray-900/10 py-6  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <div>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Bipolar history
                  </legend>
                </div>
                <div className="pl-24">
                  <div className="justify-left  flex gap-x-3">
                    <div className="flex h-6 items-center ">
                      <input
                        id="Mania"
                        name="Mania"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={(e) => handleCheckboxChange(e, "Mania")}
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="Mania"
                        className="font-medium text-gray-900"
                      >
                        Mania
                      </label>
                    </div>
                  </div>
                  <div className=" flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="Depression"
                        name="Depression"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={(e) => handleCheckboxChange(e, "Depression")}
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="Depression"
                        className="font-medium text-gray-900"
                      >
                        Depression
                      </label>
                    </div>
                  </div>
                  <div className=" flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="Hypomania"
                        name="Hypomania"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={(e) => handleCheckboxChange(e, "Hypomania")}
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="Hypomania"
                        className="font-medium text-gray-900"
                      >
                        Hypomania
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-900/10 py-6 ">
                <p className=" text-sm leading-6 text-gray-600">
                  Check if apply to patient
                </p>
                <fieldset className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="flex text-sm font-medium leading-6 text-gray-900">
                    Currently psychotic
                  </dt>

                  <dd className="mt-2 pl-24 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <div className="flex items-center gap-x-3 pr-16">
                      <input
                        id="psychotic"
                        name="psychotic"
                        type="radio"
                        value="Yes"
                        onChange={(e) => handleRadioChange(e, "Psychotic")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Yes
                      </label>

                      <input
                        id="psychotic"
                        name="psychotic"
                        type="radio"
                        value="No"
                        onChange={(e) => handleRadioChange(e, "Psychotic")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        No
                      </label>
                    </div>
                  </dd>
                </fieldset>
                <fieldset className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="flex text-sm font-medium leading-6 text-gray-900">
                    Patient has attempted suicide
                  </dt>

                  <dd className="mt-2 pl-24 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <div className="flex items-center gap-x-3 pr-16">
                      <input
                        id="suicide"
                        name="suicide"
                        type="radio"
                        value="Yes"
                        onChange={(e) => handleRadioChange(e, "Suicide")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Yes
                      </label>

                      <input
                        id="suicide"
                        name="suicide"
                        type="radio"
                        value="No"
                        onChange={(e) => handleRadioChange(e, "Suicide")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        No
                      </label>
                    </div>
                  </dd>
                </fieldset>
                <fieldset className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="flex text-sm font-medium leading-6 text-gray-900">
                    At risk for Kidney disease
                    <Tooltip text="Lithium can affect kidney function, so it will not be included in the suggested medication list for patients with a risk or history of kidney disease.">
                      <span className="material-symbols-outlined  ml-1">
                        info
                      </span>
                    </Tooltip>
                  </dt>
                  <dd className="mt-2 pl-24 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <div className="flex items-center gap-x-3 pr-16">
                      <input
                        id="Kidney"
                        name="Kidney"
                        type="radio"
                        value="Yes"
                        onChange={(e) => handleRadioChange(e, "Kidney")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Yes
                      </label>

                      <input
                        id="Kidney"
                        name="Kidney"
                        type="radio"
                        value="No"
                        onChange={(e) => handleRadioChange(e, "Kidney")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        No
                      </label>
                    </div>
                  </dd>
                </fieldset>
                <fieldset className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="flex text-sm font-medium leading-6 text-gray-900">
                    At risk for Liver disease
                    <Tooltip text="Depakote is processed through the liver, so it will not be included in the suggested medication list for patients with a risk or history of liver disease.">
                      <span className="material-symbols-outlined  ml-1">
                        info
                      </span>
                    </Tooltip>
                  </dt>
                  <dd className="mt-2 pl-24 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <div className="flex items-center gap-x-3 pr-16">
                      <input
                        id="Liver"
                        name="Liver"
                        type="radio"
                        value="Yes"
                        onChange={(e) => handleRadioChange(e, "Liver")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Yes
                      </label>

                      <input
                        id="Liver"
                        name="Liver"
                        type="radio"
                        value="No"
                        onChange={(e) => handleRadioChange(e, "Liver")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        No
                      </label>
                    </div>
                  </dd>
                </fieldset>

                <fieldset className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="flex text-sm font-medium leading-6 text-gray-900">
                    <Tooltip text="Second-generation antipsychotics can cause low blood pressure upon standing, putting the patient at risk of passing out and hitting their head, so they will not be included in suggested medication list for patients with a risk or history of low blood pressure.">
                      At risk for low blood pressure or concern for falls
                      <span className="material-symbols-outlined  ml-1">
                        info
                      </span>
                    </Tooltip>
                  </dt>

                  <dd className="mt-2 pl-24 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <div className="flex items-center gap-x-3 pr-16">
                      <input
                        id="blood_pressure"
                        name="blood_pressure"
                        type="radio"
                        value="Yes"
                        onChange={(e) => handleRadioChange(e, "blood_pressure")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="blood_pressure"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Yes
                      </label>

                      <input
                        id="blood_pressure"
                        name="blood_pressure"
                        type="radio"
                        value="No"
                        onChange={(e) => handleRadioChange(e, "blood_pressure")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="blood_pressure"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        No
                      </label>
                    </div>
                  </dd>
                </fieldset>
                <fieldset className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="flex text-sm font-medium leading-6 text-gray-900">
                    Has weight gain concerns
                    <Tooltip text="Seroquel, Risperdal, Abilify, and Zyprexa are known for causing weight gain, so they will not be included in the suggested medications list for patients with concerns about weight gain.">
                      <span className="material-symbols-outlined  ml-1">
                        info
                      </span>
                    </Tooltip>
                  </dt>

                  <dd className="mt-2 pl-24 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <div className="flex items-center gap-x-3 pr-16">
                      <input
                        id="weight_gain"
                        name="weight_gain"
                        type="radio"
                        value="Yes"
                        onChange={(e) => handleRadioChange(e, "weight_gain")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="weight_gain"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Yes
                      </label>

                      <input
                        id="weight_gain"
                        name="weight_gain"
                        type="radio"
                        value="No"
                        onChange={(e) => handleRadioChange(e, "weight_gain")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="weight_gain"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        No
                      </label>
                    </div>
                  </dd>
                </fieldset>
              </div>
              <div className="flex border-b border-gray-900/10 py-6 ">
                <div className="w-[300px]">
                  <legend className="flex text-sm font-medium leading-6 text-gray-900">
                    Reproductive Status
                  </legend>
                </div>
                <div className="w-[500px] pl-16">
                  <div className="  flex gap-x-3">
                    <div className="flex h-6 items-center ">
                      <input
                        id="Reproductive"
                        name="Reproductive"
                        type="checkbox"
                        value="Yes"
                        onChange={(e) => handleRadioChange(e, "Reproductive")}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        <Tooltip text="Depakote is known for causing birth defects and will not be included in the suggested medications list for patients at risk of pregnancy. Note: If the patient is on birth control, taking Depakote is less of a risk.">
                          Any risk of pregnancy
                          <span className="material-symbols-outlined ml-1">
                            info
                          </span>
                        </Tooltip>
                      </label>
                    </div>
                  </div>
                  <div className=" mt-2 hidden gap-x-3 sm:flex">
                    <div className="flex h-6 items-center">
                      <input
                        id="risk_pregnancy"
                        name="risk_pregnancy"
                        type="checkbox"
                        value="Yes"
                        onChange={(e) => handleRadioChange(e, "risk_pregnancy")}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        <Tooltip text="Depakote is known for causing birth defects and will not be included in the suggested medications list for patients interested in becoming pregnant.">
                          Wants to conceive in next 2 years
                          <span className="material-symbols-outlined ml-1">
                            info
                          </span>
                        </Tooltip>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex  items-center">
                <div className="w-[300px]">
                  <label
                    htmlFor="current-state"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Current medications
                  </label>
                </div>
                <div className="w-[500px]  pl-16">
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
                    placeholder="Separate multiple medications with commas"
                    className={
                      isLoading
                        ? " url_input_loading peer w-1/2"
                        : "ani_input peer mt-2 w-1/2"
                    }
                  />
                </div>
              </div>
              <div className="mt-5 flex items-center ">
                <div className=" w-[300px]">
                  <label
                    htmlFor="current-state"
                    className="block flex text-sm font-medium leading-6 text-gray-900"
                  >
                    Prior medications
                    <Tooltip text="Any bipolar medications entered here will not appear in the list of suggested medications, as they have already been tried without success.">
                      <span className="material-symbols-outlined  ml-1">
                        info
                      </span>
                    </Tooltip>
                  </label>
                </div>
                <div className="w-[500px]  pl-16">
                  <input
                    id="priorMedications"
                    type="ani_input"
                    value={newPatientInfo.PriorMedications}
                    onChange={(e) =>
                      setNewPatientInfo({
                        ...newPatientInfo,
                        PriorMedications: String(e.target.value),
                      })
                    }
                    required
                    placeholder="Separate multiple medications with commas"
                    className={
                      isLoading
                        ? " url_input_loading peer w-1/2"
                        : "ani_input peer mt-2 w-1/2"
                    }
                  />
                </div>
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
    </section>
  );
};

export default NewPatientForm;
