import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { PatientInfo } from "./PatientTypes";

interface PatientIDInputProps {
  patientInfo: PatientInfo;
  setPatientInfo: React.Dispatch<React.SetStateAction<PatientInfo>>;
}

function PatientIDInput({ patientInfo, setPatientInfo }: PatientIDInputProps) {
  useEffect(() => {
    const generatedGuid = uuidv4();
    setPatientInfo({ ...patientInfo, ID: generatedGuid });
  }, [patientInfo, setPatientInfo]);

  return (
    <div className="">
      <label htmlFor="name" className="block font-latoBold text-sm pb-2">
        Patient ID:{" "}
      </label>
      <input
        type="text"
        placeholder="Patient ID:"
        value={patientInfo.ID}
        readOnly
        className="url_input peer w-1/2"
      />
    </div>
  );
}

export default PatientIDInput;
