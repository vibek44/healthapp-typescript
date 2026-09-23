import { ZodError } from "zod";
import { PatientEntrySchema, EntryNoId } from "../types.ts";
export const newPatientParser = (req, _res, next) => {
    try {
        PatientEntrySchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof ZodError || error instanceof Error)
            next(error);
    }
};
export const patientEntryParser = (req, _res, next) => {
    const result = EntryNoId.safeParse(req.body);
    if (result.error) {
        next(result.error);
        return;
    }
    req.body = result.data;
    next();
};
