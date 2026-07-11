export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  ssn: string;
}

export type PatientEntry = Omit<Patient, "ssn">;
export type NewPatientEntry = Omit<Patient, "id">;
