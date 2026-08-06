import { z } from "zod";

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;
// Gender  type is the union of all the propertie's value
export type Gender = (typeof Gender)[keyof typeof Gender];

export const PatientEntrySchema = z.object({
  name: z.string().min(3),
  occupation: z.string().min(2),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Object.values(Gender)),
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
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type EntryWithoutID = UnionOmit<Entry, "id">;

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

/*

export const Diagnoses = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export type Diagnoses = z.infer<typeof Diagnoses>;

const BaseEntrySchema = z.object({
  id: z.string(),
  date: z.iso.date(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(Diagnoses.shape.code).optional(),
});

const HealthCheckRatingSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
]);
type HealthCheckRatingSchema = z.infer<typeof HealthCheckRatingSchema>;

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: "HealthCheck",
  healthCheckRating: HealthCheckRatingSchema,
});
type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: "OccupationalHealthcare",
  employerName: z.string(),
  sickLeave: z
    .object({ startDate: z.string(), endDate: z.string() })
    .optional(),
});
type OccupationalHealthcareEntry = z.infer<
  typeof OccupationalHealthcareEntrySchema
>;
const HospitalEntrySchema = BaseEntrySchema.extend({
  type: "Hospital",
  discharge: z.object({ date: z.string(), criteria: z.string() }),
});
type HospitalEntry = z.infer<typeof HospitalEntrySchema>;
*/
