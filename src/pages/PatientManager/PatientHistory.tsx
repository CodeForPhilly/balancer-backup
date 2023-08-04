import { PatientInfo } from "./PatientTypes";
import accountLogo from "../../assets/account.svg";

export interface PatientHistoryProps {
  allPatientInfo: PatientInfo[];
  setPatientInfo: React.Dispatch<React.SetStateAction<PatientInfo>>;
  setAllPatientInfo: React.Dispatch<React.SetStateAction<PatientInfo[]>>;
  copy: string;
  onPatientDeleted: (patientId: string) => void; // New prop
}
const PatientHistory = ({
  allPatientInfo,
  setPatientInfo,
  setAllPatientInfo,

  onPatientDeleted,
}: PatientHistoryProps) => {
  const handleDeletePatient = (
    patientIDToDelete: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();

    const updatedPatientInfo = allPatientInfo.filter(
      (patient) => patient.ID !== patientIDToDelete
    );

    localStorage.setItem("patientInfos", JSON.stringify(updatedPatientInfo));
    setAllPatientInfo(updatedPatientInfo);

    onPatientDeleted(patientIDToDelete);
  };

  return (
    <div className="flex flex-col gap-2 max-h-100 overflow-y-auto mb-12">
      <br />
      <h2 className="font-satoshi font-bold text-gray-600 text-xl">
        List of <span className="blue_gradient">Patients</span>
      </h2>
      {allPatientInfo.reverse().map((item, index) => (
        <div
          key={`link-${index}`}
          onClick={() => setPatientInfo(item)}
          className="link_card  hover:bg-indigo-100"
        >
          <div className="copy_btn">
            <img
              src={accountLogo}
              alt="accountLogo_icon"
              className="w-[40%] h-[40%] object-contain"
            />
          </div>
          <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
            ID: {item.ID} -{item.Diagnosis}
          </p>
          <div
            className="delete flex items-center justify-center w-8 h-6 rounded-full bg-white text-black hover:bg-red-500"
            onClick={(event) => handleDeletePatient(item.ID, event)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M15.293 4.293a1 1 0 011.414 1.414L11.414 12l5.293 5.293a1 1 0 01-1.414 1.414L10 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 12 3.293 6.707a1 1 0 111.414-1.414L10 10.586l5.293-5.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientHistory;
