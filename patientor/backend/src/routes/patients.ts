import express, {
  type Response,
  type Request,
  type NextFunction,
} from "express";
import patientsService from "../services/patientService.ts";
import {
  newPatientParser,
  patientEntryParser,
} from "../middleware/entryParser.ts";
import errorHandler from "../middleware/errorHandler.ts";
import type {
  PatientEntry,
  Patient,
  ErrorType,
  NonSensitivePatientData,
  EntryNoId,
} from "../types.ts";
// import type{ NewPatientEntry } from "../types.ts";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  res.send(patientsService.getPatientData());
});

patientsRouter.get("/:id", (req, res: Response<Patient | ErrorType>) => {
  const individualData = patientsService.getSinglePatientData(req.params.id);
  if (!individualData) {
    res.status(404).send({ error: "Patient data not found" });
    return;
  }
  res.send(individualData);
});

patientsRouter.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, PatientEntry>,
    res: Response<Patient>,
    next: NextFunction
  ) => {
    try {
      const newEntry = patientsService.addPatient(req.body);
      res.send(newEntry);
    } catch (error: unknown) {
      next(error);
    }
  }
);

patientsRouter.post(
  "/:id/entries",
  patientEntryParser,
  (
    req: Request<{ id: string }, unknown, EntryNoId>,
    res: Response,
    _next: NextFunction
  ) => {
    console.log(req.body);
    const result = patientsService.addPatientEntry(req.params.id, req.body);
    if (!result) {
      return res.status(400).send({ error: "Patient Entry not found" });
    }
    return res.send(result);
  }
);

patientsRouter.use(errorHandler);
export default patientsRouter;
