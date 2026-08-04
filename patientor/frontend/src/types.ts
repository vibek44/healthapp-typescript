export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

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

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

export interface EntryProps {
  entry: Entry;
  diagnoses: Diagnoses[];
}
interface EntryDetailsProps {
  diagnoses: Diagnoses[];
}
export interface OccupationalHealthcareEntryProps extends EntryDetailsProps {
  entry: OccupationalHealthcareEntry;
}

export interface HealthCheckEntryProps extends EntryDetailsProps {
  entry: HealthCheckEntry;
}

export interface HospitalEntryProps extends EntryDetailsProps {
  entry: HospitalEntry;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
