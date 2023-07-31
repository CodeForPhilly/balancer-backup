import { PatientInfo } from "./PatientTypes";
// import { loader } from "../../assets";
import minLogo from "../../assets/min.svg";
import maxLogo from "../../assets/max.svg";
import { useState } from "react";
import axios from "axios";
import TypingAnimation from "../../components/Header/components/TypingAnimation";

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
  const [loading, setLoading] = useState(false);
  const [riskData, setRiskData] = useState<any>(null);
  const [clickedMedication, setClickedMedication] = useState<string | null>(
    null
  );

  const handleClickSummary = () => {
    setShowSummary(!showSummary);
  };

  const handleMedicationClick = async (medication: string) => {
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
  };

  return (
    <div className="my-1 max-w-full flex items-center">
      {getMedicationInfo.isFetching ? (
        <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
      ) : getMedicationInfo.error ? (
        <p className="font-inter font-bold text-black text-center">
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
                    className="md:w-7 md:h-7 hover:border-blue-600 hover:border-b-2"
                  />
                ) : (
                  <img
                    src={maxLogo}
                    alt="logo"
                    className="md:w-7 md:h-7 hover:border-blue-600 hover:border-b-2"
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
                <div className="mt-6 border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <div className="flex space-between ">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 w-[50%]">
                        <dt className="text-sm font-medium leading-6 text-gray-900 ">
                          Patient ID:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {patientInfo.ID}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 w-[50%]">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Current State:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {patientInfo.Diagnosis}
                        </dd>
                      </div>
                    </div>
                    <div className="flex px-4 py-6 sm:grid sm:gap-4 sm:px-0 ">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Current Medications:
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patientInfo.CurrentMedications}
                      </dd>
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
                                  className={`flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-4 
                                ${
                                  medication === clickedMedication
                                    ? "bg-indigo-100"
                                    : ""
                                }`}
                                >
                                  <div className="flex w-0 flex-1 items-center">
                                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                      <span className="truncate font-medium">
                                        {medication}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="ml-4 flex-shrink-0">
                                    <button
                                      onClick={() =>
                                        handleMedicationClick(medication)
                                      }
                                      className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                                    >
                                      Benefits and risks
                                    </button>
                                  </div>
                                </li>
                              )
                            )}
                        </ul>
                      </dd>
                    </div>

                    {riskData && (
                      <div className="px-4 py-6 sm:grid sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Benefits and risks
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          <div className="flex">
                            <div className=" w-[50%]">
                              <div>
                                <h4 className="text-sm font-medium mb-3">
                                  Benefits:
                                </h4>
                              </div>
                              <div>
                                <ul>
                                  {riskData.benefits.map((benefit: string) => (
                                    <li className="text-sm mb-2">{benefit}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="w-[50%]">
                              <div>
                                <h4 className="text-sm font-medium mb-3">
                                  Risks:
                                </h4>
                              </div>
                              <div className="">
                                <ul className="">
                                  {riskData.risks.map((risk: string) => (
                                    <li className="text-sm mb-2">{risk}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </dd>
                      </div>
                    )}
                    {/* <label htmlFor="PossibleMedications" className="">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Benefits and risks
                      </dt>
                      <br />

                      <p className="font-inter font-medium text-sm text-gray-700 whitespace-pre-wrap">
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
                          }}
                        ></pre>
             
                      </p>
                    </label> */}
                  </dl>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default PatientSummary;
