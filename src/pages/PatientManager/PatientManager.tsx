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

  const [getMedicationInfo] = useLazyGetMedicationInfoQuery();

  // TODO: add error and loading state guards

  return (
    <div className="mt-28 w-full max-w-2xl">
      <Welcome
        subHeader="Designed to assist prescribers"
        descriptionText="Balancer is a free and open-source tool for helping prescribers narrow
        down suitable bipolar medications based on patient characteristics."
      />
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
