import { ZodError } from "zod";
import { PatientEntrySchema } from "../types.ts";
import { type Request, type Response, type NextFunction } from "express";
import { parseNewEntry } from "../utils.ts";

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    PatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    if (error instanceof ZodError || error instanceof Error) next(error);
  }
};

export const patientEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    req.body = parseNewEntry(req.body);
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error);
    }
  }
};
