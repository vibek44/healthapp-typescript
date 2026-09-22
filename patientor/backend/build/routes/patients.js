import express from "express";
import patientsService from "../services/patientService.js";
import {
  newPatientParser,
  patientEntryParser,
} from "../middleware/entryParser.js";
// import type{ NewPatientEntry } from "../types.ts";
const patientsRouter = express.Router();
patientsRouter.get("/", (_req, res) => {
  res.send(patientsService.getPatientData());
});
patientsRouter.get("/:id", (req, res) => {
  const individualData = patientsService.getSinglePatientData(req.params.id);
  if (!individualData) {
    res.status(404).send({ error: "Patient data not found" });
    return;
  }
  res.send(individualData);
});
patientsRouter.post("/", newPatientParser, (req, res, next) => {
  try {
    const newEntry = patientsService.addPatient(req.body);
    res.send(newEntry);
  } catch (error) {
    next(error);
  }
});
patientsRouter.post("/:id/entries", patientEntryParser, (req, res, _next) => {
  //console.log(req.body);
  const result = patientsService.addPatientEntry(req.params.id, req.body);
  if (!result) {
    return res.status(400).send({ error: "Patient Entry not found" });
  }
  return res.send(result);
});
export default patientsRouter;
