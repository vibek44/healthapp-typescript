import type { Patient, Diagnoses } from "../../types";
import { Card, Divider, Paper, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransGenderIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";
interface PatientProps {
  patient: Patient | undefined;
  diagnoses: Diagnoses[];
}
const PatientInfoPage = ({ patient, diagnoses }: PatientProps) => {
  if (!patient) return undefined;
  //console.log(patient);
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
      <Typography variant="h6">Entries</Typography>
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
