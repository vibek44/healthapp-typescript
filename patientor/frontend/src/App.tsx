import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfoPage from "./components/PatientInfoPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const match = useMatch("/patients/:id");
  const patientId = match?.params.id;
  const lastFetchedId = useRef<string | null>(null);
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    let isActive = true;
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      if (isActive) {
        setPatients(patients);
      }
    };
    void fetchPatientList();
    return () => {
      isActive = false;
    };
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
            element={<PatientInfoPage patient={patient} />}
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
