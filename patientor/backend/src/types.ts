export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

//this const object can be used both during compile time and run time

export const GenderObject={
  Male:"male",
  Female:"female",
  Other:"other"
}as const 
// Gender object type is the union of all the propertie's value 
export type Gender=typeof GenderObject[keyof typeof GenderObject]

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn: string;
}

export type PatientEntry = Omit<Patient, "ssn">;
export type NewPatientEntry = Omit<Patient, "id">;
