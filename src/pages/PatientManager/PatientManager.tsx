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
    PriorMedications: "",
    PossibleMedications: { drugs: [] },
    Depression: "",
    Hypomania: "",
    Mania: "",
    Psychotic: "",
    Suicide: "",
  });

  const handlePatientDeleted = (deletedId: string) => {
    if (patientInfo.ID === deletedId) {
      setPatientInfo({
        ID: "",
        Diagnosis: "",
        OtherDiagnosis: "",
        Description: "",
        CurrentMedications: "",
        PriorMedications: "",
        PossibleMedications: { drugs: [] },
        Depression: "",
        Hypomania: "",
        Mania: "",
        Psychotic: "",
        Suicide: "",
      });
      setIsPatientDeleted(true);
    }
  };

  const [allPatientInfo, setAllPatientInfo] = useState<PatientInfo[]>([]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  // TODO: add error and loading state guards

  return (
    <div className="mt-20 flex w-full max-w-6xl flex-col items-center justify-center md:mt-28">
      {/* AI-powered Bipolar Medication: <br className="max-md:hidden" /> */}
      {/* <h1 className="head_text">
        <span className="orange_gradient">Balancer</span>
      </h1> */}
      <h2 className="desc">Designed to assist prescribers</h2>
      <h2 className="desc1">
        Balancer is a free and open-source tool for helping prescribers narrow
        down suitable bipolar medications based on patient characteristics.
      </h2>
      <div className="mt-0 flex w-[75%] flex-col md:mt-12 ">
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
