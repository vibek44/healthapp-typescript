import express, {
  type Response,
  type Request,
  type NextFunction,
} from "express";
import patientsService from "../services/patientService.ts";
import { newEntryParser } from "../middleware/entryParser.ts";
import errorHandler from "../middleware/errorHandler.ts";
import type {
  PatientEntry,
  NewPatientEntry,
  Patient,
  ErrorType,
} from "../types.ts";
// import type{ NewPatientEntry } from "../types.ts";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<PatientEntry[]>) => {
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
  newEntryParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<Patient>,
    next: NextFunction
  ) => {
    try {
      const newEntry = patientsService.addPatientData(req.body);
      res.send(newEntry);
    } catch (error: unknown) {
      next(error);
    }
  }
);

patientsRouter.post("/:id/entries", (req, res) => {
  console.log(req.params.id);
  res.send("hi");
});

patientsRouter.use(errorHandler);
export default patientsRouter;
