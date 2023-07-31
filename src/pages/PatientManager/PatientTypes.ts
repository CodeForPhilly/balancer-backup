export interface PatientInfo {
  ID: string;
  Diagnosis: string;
  OtherDiagnosis: string;
  Description: string;
  CurrentMedications: string;
  PossibleMedications: {
    drugs: string[]; // Update this to match the structure of PossibleMedications
  };
}
