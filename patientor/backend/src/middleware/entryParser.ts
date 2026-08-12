import { ZodError } from "zod";
import { PatientEntrySchema, EntryNoId } from "../types.ts";
import { type Request, type Response, type NextFunction } from "express";

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
  const result = EntryNoId.safeParse(req.body);
  if (result.error) {
    next(result.error);
    return;
  }
  req.body = result.data;
  console.log(result.data);

  next();
};
