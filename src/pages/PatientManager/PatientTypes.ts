export interface PatientInfo {
  ID?: string;
  Diagnosis?: string;
  OtherDiagnosis?: string;
  Description?: string;
  CurrentMedications?: string;
  PossibleMedications?: {
    drugs?: string[];
  };
}

export interface NewPatientInfo {
  ID?: string;
  Diagnosis?: string;
  OtherDiagnosis?: string;
  Description?: string;
  CurrentMedications?: string;
  PossibleMedications?: {
    drugs?: string[];
  };
}
