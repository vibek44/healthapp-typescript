import express from "express";
import patientsService from "../services/patientService.ts";
import { parsePatientEntry } from "../utils.ts";
 import type{ NewPatientEntry } from "../types.ts";
import z from "zod";
 

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.send(patientsService.getPatientData());
});

patientsRouter.post("/", (req, res) => {
  try {
    const parsedEntry: NewPatientEntry = parsePatientEntry(req.body);
    const newEntry = patientsService.addPatientData(parsedEntry);
    res.send(newEntry);
  } catch (error) {
    if (error instanceof Error) {
      res.json({ error: error.message });
    }else if(error instanceof z.ZodError){
      res.status(400).send({error:error.issues})
    }
  }
});

export default patientsRouter;
