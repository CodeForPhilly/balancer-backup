import { useState } from "react";

import NewPatientForm from "./NewPatientForm.tsx";
import PatientHistory from "./PatientHistory.tsx";
import PatientSummary from "./PatientSummary.tsx";
import { PatientInfo } from "./PatientTypes.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { copy, loader } from "../../assets/index.js";
import Welcome from "../../components/Welcome/Welcome.tsx";
import { useLazyGetMedicationInfoQuery } from "../../services/medicationsApi.tsx";

const PatientManager = () => {
  const [patientInfo, setPatientInfo] = useState({
    ID: "",
    Diagnosis: "",
    OtherDiagnosis: "",
    Description: "",
    CurrentMedications: "",
  });

  const [allPatientInfo, setAllPatientInfo] = useState<PatientInfo[]>([]);

  const [getMedicationInfo] = useLazyGetMedicationInfoQuery();

  return (
    <div className="mt-16 w-full max-w-2xl">
      <Welcome
        subHeader="Designed to assist prescribers"
        descriptionText="Balancer is an AI-powered tool for selecting bipolar medication for
        patients. We are open-source and available for free use."
      />
      <div className="mt-16 flex flex-col w-full gap-2">
        <PatientSummary
          patientInfo={patientInfo}
          getMedicationInfo={getMedicationInfo}
          loader={loader}
        />
        <NewPatientForm
          patientInfo={patientInfo}
          setPatientInfo={setPatientInfo}
          allPatientInfo={allPatientInfo}
          setAllPatientInfo={setAllPatientInfo}
          getMedicationInfo={getMedicationInfo}
        />
        <PatientHistory
          allPatientInfo={allPatientInfo}
          setPatientInfo={setPatientInfo}
          copy={copy}
        />
      </div>
    </div>
  );
};

export default PatientManager;
