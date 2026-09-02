import type { Patient, Diagnoses } from "../../types";
import { Button, Card, Divider, Paper, Typography, Grid } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransGenderIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../EntryForm";
import { useState } from "react";
interface PatientProps {
  patient: Patient | undefined;
  diagnoses: Diagnoses[];
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}
const PatientInfoPage = ({ patient, diagnoses, setPatient }: PatientProps) => {
  if (!patient) return null;
  const [modalState, setModalState] = useState<boolean>(false);
  const onModalClose = () => {
    setModalState(false);
  };
  const onModalOpen = () => {
    setModalState(true);
  };

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
