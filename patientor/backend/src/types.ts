import z, { date } from "zod";

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
export type PatientEntry = z.infer<typeof PatientEntrySchema>;

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
type HealthCheckRating = z.infer<typeof HealthCheckRatingSchema>;

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: HealthCheckRatingSchema,
});
const HealthCheckEntryNoId = HealthCheckEntrySchema.omit({ id: true });
type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;
type HealthCheckEntryNoId = z.infer<typeof HealthCheckEntryNoId>;

// InZod when properties are optional always use refine api before optional api
const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({ startDate: z.iso.date(), endDate: z.iso.date() })
    .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
      message: "StartDate must be before EndDate",
      path: ["endDate"],
    })
    .optional(),
});
const OccupationalEntryNoId = OccupationalHealthcareEntrySchema.omit({
  id: true,
});
type OccupationalHealthcareEntry = z.infer<
  typeof OccupationalHealthcareEntrySchema
>;

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({ date: z.string(), criteria: z.string() }),
});
const HospitalEntryNoId = HospitalEntrySchema.omit({ id: true });
type HospitalEntry = z.infer<typeof HospitalEntrySchema>;

const Entry = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);

const Patient = PatientEntrySchema.extend({
  id: z.string(),
  entries: z.array(Entry).optional(),
});
export type Patient = z.infer<typeof Patient>;

const NonSensitivePatientData = Patient.omit({ ssn: true, entries: true });
export type NonSensitivePatientData = z.infer<typeof NonSensitivePatientData>;

export const EntryNoId = z.discriminatedUnion("type", [
  HospitalEntryNoId,
  HealthCheckEntryNoId,
  OccupationalEntryNoId,
]);
type EntryNoId = z.infer<typeof EntryNoId>;

export interface ErrorType {
  error: string;
}
