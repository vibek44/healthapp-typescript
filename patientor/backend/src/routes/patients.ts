import express,  {type Response, type Request, type NextFunction }from "express";
import patientsService from "../services/patientService.ts";
import  { newEntryParser } from "../middleware/entryParser.ts";
import errorHandler from "../middleware/errorHandler.ts";
import type { PatientEntry, NewPatientEntry,Patient } from "../types.ts"; 
// import type{ NewPatientEntry } from "../types.ts";
 
const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res:Response<PatientEntry[]>) => {
  res.send(patientsService.getPatientData());
});

patientsRouter.post("/",newEntryParser, (req:Request<unknown,unknown,NewPatientEntry>, res:Response<Patient>, next:NextFunction) => {
  try {
    const newEntry = patientsService.addPatientData(req.body);
    res.send(newEntry);
  } catch (error:unknown) {
    next(error)
  }
});

patientsRouter.use(errorHandler)
export default patientsRouter;
