import { useState } from "react";
import NewPatientForm from "./NewPatientForm.tsx";
import PatientHistory from "./PatientHistory.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { copy } from "../../assets/index.js";
import PatientSummary from "./PatientSummary.tsx";
import { PatientInfo } from "./PatientTypes.ts";

const PatientManager = () => {
  const [isPatientDeleted, setIsPatientDeleted] = useState<boolean>(false);

  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    ID: "",
    Diagnosis: "",
    OtherDiagnosis: "",
    Description: "",
    CurrentMedications: "",
    PossibleMedications: { drugs: [] },
  });

  const handlePatientDeleted = (deletedId: string) => {
    if (patientInfo.ID === deletedId) {
      setPatientInfo({
        ID: "",
        Diagnosis: "",
        OtherDiagnosis: "",
        Description: "",
        CurrentMedications: "",
        PossibleMedications: { drugs: [] },
      });
      setIsPatientDeleted(true);
    }
  };

  const [allPatientInfo, setAllPatientInfo] = useState<PatientInfo[]>([]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  // TODO: add error and loading state guards

  return (
    <div className="mt-28 w-full max-w-2xl">
      {/* AI-powered Bipolar Medication: <br className="max-md:hidden" /> */}
      {/* <h1 className="head_text">
        <span className="orange_gradient">Balancer</span>
      </h1> */}
      <h2 className="desc">Designed to assist prescribers</h2>
      <h2 className="desc1">
        Balancer is a powerful tool for selecting bipolar medication for
        patients. We are open-source and available for free use.
      </h2>
      <div className="mt-16 flex w-full flex-col gap-2">
        <PatientSummary
          patientInfo={patientInfo}
          isPatientDeleted={isPatientDeleted}
          setPatientInfo={setPatientInfo}
        />
        <NewPatientForm
          patientInfo={patientInfo}
          setPatientInfo={setPatientInfo}
          allPatientInfo={allPatientInfo}
          setAllPatientInfo={setAllPatientInfo}
        />
        <PatientHistory
          allPatientInfo={allPatientInfo}
          setAllPatientInfo={setAllPatientInfo}
          setPatientInfo={setPatientInfo}
          copy={copy}
          onPatientDeleted={handlePatientDeleted}
        />
      </div>
    </div>
  );
};

export default PatientManager;
