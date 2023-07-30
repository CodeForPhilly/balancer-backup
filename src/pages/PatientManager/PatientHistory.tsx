import { PatientInfo } from "./PatientTypes";

export interface PatientHistoryProps {
  allPatientInfo: PatientInfo[];
  setPatientInfo: React.Dispatch<React.SetStateAction<PatientInfo>>;
  copy: string;
}

const PatientHistory = ({
  allPatientInfo,
  setPatientInfo,
  copy,
}: PatientHistoryProps) => {
  return (
    <div className="max-h-100 mb-12 flex flex-col gap-2 overflow-y-auto">
      <br />
      <h2 className="font-satoshi text-xl font-bold text-gray-600">
        List of <span className="blue_gradient">Patients</span>
      </h2>
      {allPatientInfo.reverse().map((item, index) => (
        <div
          key={`link-${index}`}
          onClick={() => setPatientInfo(item)}
          className="link_card">
          <div className="copy_btn">
            <img
              src={copy}
              alt="copy_icon"
              className="h-[40%] w-[40%] object-contain"
            />
          </div>
          <p className="flex-1 truncate font-satoshi text-sm font-medium text-blue-700">
            {item.ID}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PatientHistory;
