import { z } from "zod";

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export const PatientEntrySchema = z.object({
  name: z.string().min(3),
  occupation: z.string().trim().min(2),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender),
  ssn: z.string().regex(/^\d{6}-\d{3}[A-Za-z]$/, "invalid ssn format"),
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

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
export type HealthCheckEntryWithoutId = Omit<HealthCheckEntry, "id">;

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}
export type OccupationalEntryWithoutId = Omit<
  OccupationalHealthcareEntry,
  "id"
>;

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: { date: string; criteria: string };
}
export type HospitalEntryWithoutId = Omit<HospitalEntry, "id">;

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type EntryWithoutId = UnionOmit<Entry, "id">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = z.infer<typeof PatientEntrySchema>;
//this const object can be used both during compile time and run time

export interface Patient extends NewPatientEntry {
  id: string;
  entries: Entry[];
}

export type PatientEntry = Omit<Patient, "ssn" | "entries">;

export interface ErrorType {
  error: string;
}
