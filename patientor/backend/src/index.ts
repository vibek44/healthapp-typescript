import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses.ts";
import patientsRouter from "./routes/patients.ts";
import { unknownEndPoint, errorHandler } from "./middleware/errorHandler.ts";
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/*splat", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});
app.use(unknownEndPoint);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`app running in port ${PORT}`);
});
