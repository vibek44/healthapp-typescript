import { z } from "zod"

export const GenderObject={
  male:"male",
  Female:"female",
  Other:"other"
} as const 
// Gender  type is the union of all the propertie's value 
export type Gender=typeof GenderObject[keyof typeof GenderObject]

export const NewEntrySchema=z.object({
  name:z.string().min(3),
  occupation:z.string().min(2),
  dateOfBirth:z.iso.date(),
  gender:z.enum(Object.values(GenderObject)),
  ssn:z.string().min(9)
})

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

//this const object can be used both during compile time and run time
export interface Patient extends NewPatientEntry {
  id: string;
 
}

export type PatientEntry = Omit<Patient, "ssn">;
export type NewPatientEntry = z.infer<typeof NewEntrySchema>
