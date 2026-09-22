import z from "zod";
export const Gender = {
    Male: "male",
    Female: "female",
    Other: "other",
};
export const PatientEntrySchema = z.object({
    name: z.string().trim().min(6, { error: "name is too short!" }),
    occupation: z.string().trim().min(3, "Too Short"),
    dateOfBirth: z.iso.date("Bad Date!").optional(),
    gender: z.enum(Gender),
    ssn: z
        .string()
        .regex(/^\d{6}-\d{3}[A-Za-z]$/, "invalid ssn format")
        .optional(),
});
export const Diagnoses = z.object({
    code: z.string(),
    name: z.string(),
    latin: z.string().optional(),
});
const BaseEntrySchema = z.object({
    id: z.string(),
    date: z.iso.date({
        error: (issue) => `Bad Date! Expected string, got ${typeof issue.input}`,
    }),
    description: z.string().min(10, "description too short or invalid"),
    specialist: z.string().min(2, "specialist too short or invalid"),
    diagnosisCodes: z.array(Diagnoses.shape.code).optional(),
});
const HealthCheckRatingSchema = z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
]);
//type HealthCheckRating = z.infer<typeof HealthCheckRatingSchema>;
const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: HealthCheckRatingSchema,
});
const HealthCheckEntryNoId = HealthCheckEntrySchema.omit({ id: true });
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
/*type OccupationalHealthcareEntry = z.infer<
  typeof OccupationalHealthcareEntrySchema
>;*/
const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({ date: z.string(), criteria: z.string() }),
});
const HospitalEntryNoId = HospitalEntrySchema.omit({ id: true });
//type HospitalEntry = z.infer<typeof HospitalEntrySchema>;
export const Entry = z.discriminatedUnion("type", [
    HealthCheckEntrySchema,
    OccupationalHealthcareEntrySchema,
    HospitalEntrySchema,
]);
const Patient = PatientEntrySchema.extend({
    id: z.string(),
    entries: z.array(Entry).optional(),
});
const NonSensitivePatientData = Patient.omit({ ssn: true, entries: true });
export const EntryNoId = z.discriminatedUnion("type", [
    HospitalEntryNoId,
    HealthCheckEntryNoId,
    OccupationalEntryNoId,
]);
