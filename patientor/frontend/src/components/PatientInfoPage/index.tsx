import type { Patient, Diagnoses } from "../../types";
import { Button, Card, Divider, Paper, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransGenderIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryFrom";
import { useState } from "react";
interface PatientProps {
  patient: Patient | undefined;
  diagnoses: Diagnoses[] | undefined;
}
const PatientInfoPage = ({ patient, diagnoses }: PatientProps) => {
  if (!patient) return undefined;
  const [visibility, setVisibility] = useState<boolean>(false);
  const handleVisibility = () => setVisibility(!visibility);

  return (
    <Card sx={{ width: "40em", padding: "1em", margin: "auto" }}>
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
      <Divider sx={{ m: "2em" }} />
      {visibility && <AddEntryForm handleVisibility={handleVisibility} />}
      {!visibility && (
        <Button variant="contained" onClick={handleVisibility}>
          CREATE NEW ENTRY
        </Button>
      )}
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
    </Card>
  );
};

export default PatientInfoPage;
