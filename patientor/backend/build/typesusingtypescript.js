import { z } from "zod";
export const Gender = {
    Male: "male",
    Female: "female",
    Other: "other",
};
export const PatientEntrySchema = z.object({
    name: z.string().min(3),
    occupation: z.string().trim().min(2),
    dateOfBirth: z.iso.date(),
    gender: z.enum(Gender),
    ssn: z.string().regex(/^\d{6}-\d{3}[A-Za-z]$/, "invalid ssn format"),
});
export const HealthCheckRating = {
    Healthy: 0,
    LowRisk: 1,
    HighRisk: 2,
    CriticalRisk: 3,
};
