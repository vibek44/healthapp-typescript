import express from "express";
import patientsService from "../services/patientService.ts";
import  { newEntryParser } from "../middleware/entryParser.ts";
import errorHandler from "../middleware/errorHandler.ts";
// import type{ NewPatientEntry } from "../types.ts";
 

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.send(patientsService.getPatientData());
});

patientsRouter.post("/",newEntryParser, (req, res,next) => {
  try {
    const newEntry = patientsService.addPatientData(req.body);
    res.send(newEntry);
  } catch (error:unknown) {
    next(error)
  }
});

 patientsRouter.use(errorHandler)
export default patientsRouter;
