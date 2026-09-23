import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses.js";
import patientsRouter from "./routes/patients.js";
import { unknownEndPoint, errorHandler } from "./middleware/errorHandler.js";
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);
app.use(unknownEndPoint);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`app running in port ${PORT}`);
});
