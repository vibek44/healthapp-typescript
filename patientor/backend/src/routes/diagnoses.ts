import express, {type Response} from "express";
import diagnosesService from "../services/diagnosesService.ts";
import type { Diagnoses } from "../types.js";
const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res:Response<Diagnoses[]>) => {
  res.send(diagnosesService.getDiagnosesData());
});

export default diagnosesRouter;
