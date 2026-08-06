import { PatientEntrySchema } from "../types.ts";
import { type Request, type Response, type NextFunction } from "express";

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    PatientEntrySchema.parse(req.body);
  } catch (error: unknown) {
    next(error);
  }
};

//export const patientEntry;
