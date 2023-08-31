export interface PatientInfo {
  ID?: string;
  Diagnosis?: string;
  OtherDiagnosis?: string;
  Description?: string;
  Depression?: string;
  Hypomania?: string;
  Mania?: string;
  CurrentMedications?: string;
  PriorMedications?: string;
  PossibleMedications?: {
    drugs?: string[];
  };
  Psychotic: string;
  Suicide: string;
}

export interface NewPatientInfo {
  ID?: string;
  Diagnosis?: string;
  OtherDiagnosis?: string;
  Description?: string;
  Depression?: string;
  Hypomania?: string;
  Mania?: string;
  CurrentMedications?: string;
  PriorMedications?: string;
  PossibleMedications?: {
    drugs?: string[];
  };
  Psychotic: string;
}
