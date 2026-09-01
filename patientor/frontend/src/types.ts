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

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type EntryWithoutId = UnionOmit<Entry, "id">;

export interface EntryProps {
  entry: Entry;
  diagnoses: Diagnoses[] | undefined;
}
interface EntryDetailsProps {
  diagnoses: Diagnoses[] | undefined;
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

/*export interface EntryFormValues {
  type: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes: string[];
  // HealthCheck
  healthCheckRating?: number;
  // Hospital
  dischargeDate?: string;
  criteria?: string;
  // OccupationalHealthcare
  employerName?: string;
  startDate?: string;
  endDate?: string;
}*/

interface BaseEntryFormValues {
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes: string[];
}

export interface HealthCheckFormValues extends BaseEntryFormValues {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalFormValues extends BaseEntryFormValues {
  type: "Hospital";
  dischargeDate: string;
  criteria: string;
}

export interface OccupationalHealthcareFormValues extends BaseEntryFormValues {
  type: "OccupationalHealthcare";
  employerName: string;
  startDate: string;
  endDate: string;
}

export type EntryFormValues =
  | HealthCheckFormValues
  | HospitalFormValues
  | OccupationalHealthcareFormValues;
