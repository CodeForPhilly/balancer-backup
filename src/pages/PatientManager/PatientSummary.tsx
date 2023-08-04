import { PatientInfo } from "./PatientTypes";
import minLogo from "../../assets/min.svg";
import maxLogo from "../../assets/max.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import TypingAnimation from "../../components/Header/components/TypingAnimation";

interface PatientSummaryProps {
  patientInfo: PatientInfo;
  isPatientDeleted: boolean;
}

const PatientSummary = ({
  patientInfo,
  isPatientDeleted,
}: PatientSummaryProps) => {
  const [showSummary, setShowSummary] = useState(true);
  const [loading, setLoading] = useState(false);
  const [riskData, setRiskData] = useState<any>(null);
  const [clickedMedication, setClickedMedication] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (isPatientDeleted) {
      // Reset the component's state
      setShowSummary(true);
      setLoading(false);
      setRiskData(null);
      setClickedMedication(null);
    }
  }, [isPatientDeleted]);

  useEffect(() => {
    // Clear the riskData whenever any data in patientInfo changes
    setRiskData(null);
    setClickedMedication(null);
  }, [patientInfo]);

  const handleClickSummary = () => {
    setShowSummary(!showSummary);
  };

  const handleMedicationClick = async (medication: string) => {
    // Toggle the clickedMedication
    if (clickedMedication === medication) {
      setClickedMedication(null);
      setRiskData(null); // Optionally, clear the riskData if medication is deselected

      return;
    } else {
      setClickedMedication(medication);
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:3001/risk", {
          diagnosis: medication,
        });
        setRiskData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  };

  return (
    <div className="my-1 max-w-full flex items-center">
      {patientInfo.Description && (
        <div
          className="flex flex-col gap-3 whitespace-normal break-words"
          style={{ width: "670px" }}
        >
          <div className="flex justify-between">
            <div>
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                <span className="blue_gradient">Summary</span>
              </h2>
            </div>
            <div onClick={handleClickSummary}>
              {showSummary ? (
                <img
                  src={minLogo}
                  alt="logo"
                  className="md:w-7 md:h-7 cursor-pointer hover:border-blue-600 hover:border-b-2"
                />
              ) : (
                <img
                  src={maxLogo}
                  alt="logo"
                  className="md:w-7 md:h-7 cursor-pointer hover:border-blue-600 hover:border-b-2"
                />
              )}
            </div>
          </div>
          {showSummary && (
            <div className="summary_box border-1bg-white ring-1 ring-slate-1000/10 hover:ring-slate-300">
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6  text-gray-500">
                  Patient details and application.
                </p>
              </div>
              <div className="mt-3  border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="flex justify-between ">
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
                      <dt className="text-sm font-medium leading-6 text-gray-900 ">
                        Patient ID:
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patientInfo.ID}
                      </dd>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Current State:
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patientInfo.Diagnosis}
                      </dd>
                    </div>
                  </div>
                  <div className="flex flex-row px-4 py-3 sm:gap-4 sm:px-0 ">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Current Medications:
                    </dt>
                    <dt className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {patientInfo.CurrentMedications}
                    </dt>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 flex text-gray-900">
                      Possible Medications:
                      <div className="flex items-start ml-3 mt-1 text-white max-w-sm">
                        {loading ? <TypingAnimation /> : null}
                      </div>
                    </dt>
                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul
                        role="list"
                        className="divide-y divide-gray-100 rounded-md border border-gray-200"
                      >
                        {patientInfo.PossibleMedications &&
                          patientInfo.PossibleMedications.drugs?.map(
                            (medication: string) => (
                              <li
                                className={`flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-4 hover:bg-indigo-100
                                ${
                                  medication === clickedMedication
                                    ? "bg-indigo-100"
                                    : ""
                                } cursor-pointer`}
                                onClick={() =>
                                  handleMedicationClick(medication)
                                }
                              >
                                <div className="flex w-0 flex-1 items-center">
                                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                    <span className="truncate font-medium">
                                      {medication}
                                    </span>
                                  </div>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <span className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Benefits and risks
                                  </span>
                                </div>
                              </li>
                            )
                          )}
                      </ul>
                    </dd>
                  </div>

                  {riskData && (
                    <div className="px-4 py-1 sm:grid sm:gap-4 sm:px-0">
                      {/* <dt className="text-sm font-medium leading-6 text-gray-900">
                          Benefits and risks
                        </dt> */}
                      <dd className="mt-1 text-sm leading-6  text-gray-900 sm:col-span-2 sm:mt-0">
                        <div className="flex">
                          <div className=" w-[50%]">
                            <div>
                              <h4 className="text-sm font-medium text-indigo-600 mb-4 mt-4">
                                Benefits:
                              </h4>
                            </div>
                            <div className="">
                              <ul className="">
                                {riskData.benefits.map(
                                  (benefit: string, index: number) => (
                                    <li
                                      key={index}
                                      className="text-sm mb-3 mr-1 h-10 hover:bg-indigo-100"
                                    >
                                      {benefit}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                          <div className="w-[50%]">
                            <div>
                              <h4 className="text-sm font-medium  text-indigo-600 mb-4  mt-4">
                                Risks:
                              </h4>
                            </div>
                            <div className="">
                              <ul className="">
                                {riskData.risks.map(
                                  (risk: string, index: number) => (
                                    <li
                                      key={index}
                                      className="text-sm mb-3 mr-1 h-10 hover:bg-indigo-100"
                                    >
                                      {risk}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientSummary;
