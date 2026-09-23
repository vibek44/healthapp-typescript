import express from "express";
import diagnosesService from "../services/diagnosesService.js";
const diagnosesRouter = express.Router();
diagnosesRouter.get("/", (_req, res) => {
  res.send(diagnosesService.getDiagnosesData());
});
export default diagnosesRouter;
