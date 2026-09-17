import { useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import type { Patient, Diagnoses } from "../../types";
import {
  Button,
  Card,
  Divider,
  Paper,
  Typography,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransGenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../EntryForm";
import { useState } from "react";
import axios from "axios";
interface PatientProps {
  diagnoses: Diagnoses[];
}
const PatientInfoPage = ({ diagnoses }: PatientProps) => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [modalState, setModalState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!id) return;
    let isActive = true;
    const fetchPatientInfo = async () => {
      console.log("run infopage eff");
      try {
        const patientDetail = await patientService.getIndividualPatientData(id);
        if (isActive) setPatient(patientDetail);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (isActive && error.code == "ECONNABORTED") {
            setError("timeout error!");
          } else if (isActive && error.response) {
            if (error.response.status === 404) {
              setError("Patient not found!");
              return;
            }
            setError("Server error!");
          } else {
            setError("Network error!");
          }
        } else {
          setError("Unexpected error!");
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };
    void fetchPatientInfo();
    return () => {
      isActive = false;
    };
  }, [id]);

  const onModalClose = () => {
    setModalState(false);
  };
  const onModalOpen = () => {
    setModalState(true);
  };
  if (error) return <Alert severity="error">{error}</Alert>;
  if (loading)
    return <CircularProgress sx={{ display: "block", margin: "2em auto" }} />;
  if (!patient) return <Typography>Patient not available</Typography>;

  return (
    <Card sx={{ width: "50em", padding: "1em", margin: "auto" }}>
      <Grid container rowSpacing={2} direction="column">
        <Typography sx={{ my: 1 }} variant="h5">
          {patient.name}
          {patient.gender === "male" ? (
            <MaleIcon sx={{ mx: 1 }} />
          ) : patient.gender === "female" ? (
            <FemaleIcon sx={{ mx: 1 }} />
          ) : (
            <TransGenderIcon sx={{ mx: 1 }} />
          )}
        </Typography>
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>Occupation: {patient.occupation}</Typography>
        <Typography>Date of Birth: {patient.dateOfBirth}</Typography>
        <Divider sx={{ marginY: "1em" }} />

        <AddEntryModal
          open={modalState}
          onClose={onModalClose}
          diagnoses={diagnoses}
          patient={patient}
          setPatient={setPatient}
        />
        <Button
          variant="contained"
          sx={{ marginX: "auto" }}
          onClick={onModalOpen}
        >
          CREATE NEW ENTRY
        </Button>

        <Typography variant="h6" sx={{ marginY: 5 }}>
          Entries
        </Typography>
        <Typography variant="subtitle1">
          {patient.entries.map((el) => (
            <Paper
              key={el.id}
              variant="elevation"
              sx={{ border: "solid", margin: 2, paddingLeft: 1 }}
            >
              <EntryDetails entry={el} diagnoses={diagnoses} />
            </Paper>
          ))}
        </Typography>
      </Grid>
    </Card>
  );
};

export default PatientInfoPage;
