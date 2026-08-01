import { z } from "zod";

export const GenderObject = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;
// Gender  type is the union of all the propertie's value
export type Gender = (typeof GenderObject)[keyof typeof GenderObject];

export const NewEntrySchema = z.object({
  name: z.string().min(3),
  occupation: z.string().min(2),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Object.values(GenderObject)),
  ssn: z.string().min(9).includes("-"),
});

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses["code"]>;
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: { date: string; criteria: string };
}

type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;
//this const object can be used both during compile time and run time
export interface Patient extends NewPatientEntry {
  id: string;
  entries: Entry[];
}

export type PatientEntry = Omit<Patient, "ssn" | "entries">;

export interface ErrorType {
  error: string;
}
