import { useState, useEffect, useRef, Suspense, lazy } from "react";

import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography, Alert } from "@mui/material";
import { Patient, Diagnoses } from "./types";
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

const PatientInfoPage = lazy(() => import("./components/PatientInfoPage"));

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnoses[]>([]);
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [error, setError] = useState<string>();
  const match = useMatch("/patients/:id");
  const patientId = match?.params?.id;
  const lastFetchedId = useRef<string | null>(null);

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const [patientsData, diagnosesData] = await Promise.all([
          patientService.getAll(),
          patientService.getDiagnoses(),
        ]);
        setPatients(patientsData);
        setDiagnoses(diagnosesData);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e.code === "ECONNABORTED" && e.message.includes("timeout")) {
            setError("Connection timeout");
          } else if (e.response) {
            console.log(e.toJSON());
            setError("Something went Wrong: Server error !");
          } else if (e.request) {
            setError(`Something went wrong: Network Error !`);
          }
        } else {
          setError("Unknown error");
        }
      }
    };
    void fetchPatientList();
  }, []);
  useEffect(() => {
    if (!patientId || patientId === lastFetchedId.current) return;
    let isActive = true;
    lastFetchedId.current = patientId;
    const fetchPatientInfo = async () => {
      console.log("match run eff1");
      const patientDetail = await patientService.getIndividualPatientData(
        patientId
      );
      if (isActive) setPatient(patientDetail);
    };
    void fetchPatientInfo();
    console.log("1eff");
    return () => {
      isActive = false;
    };
  }, [patientId]);
  return (
    <div className="App">
      <Container>
        {error && <Alert severity="error">{error}</Alert>}
        <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider sx={{ marginY: 2 }} />
        <Routes>
          <Route
            path="/patients/:id"
            element={
              <Suspense fallback={<b>InfoPage loading...</b>}>
                <PatientInfoPage
                  setPatient={setPatient}
                  patient={patient}
                  diagnoses={diagnoses}
                />
              </Suspense>
            }
          />

          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
