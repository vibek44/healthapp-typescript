import type { Patient, Diagnoses } from "../../types";
import {
  Button,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  Grid,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransGenderIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import { useState } from "react";
interface PatientProps {
  patient: Patient | undefined;
  diagnoses: Diagnoses[] | undefined;
}
const PatientInfoPage = ({ patient, diagnoses }: PatientProps) => {
  if (!patient) return undefined;
  const [visibility, setVisibility] = useState<boolean>(false);
  const [entry, setEntry] = useState<string>("");
  const handleSetEntry = (value: string) => setEntry(value);
  //console.log(entry);
  return (
    <Card sx={{ width: "40em", padding: "1em", margin: "auto" }}>
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

        {visibility && (
          <FormControl fullWidth>
            <InputLabel>select entry</InputLabel>
            <Select
              label="create Entry"
              value={entry}
              onChange={({ target }) => setEntry(target.value)}
            >
              <MenuItem value="HealthCheck">HelathCheck Entry</MenuItem>
              <MenuItem value="Hospital">Hospital Entry</MenuItem>
              <MenuItem value="Occupational">Occupational Entry</MenuItem>
            </Select>
          </FormControl>
        )}
        {entry && <AddEntryForm handleSetEntry={handleSetEntry} />}
        {!entry && (
          <Button
            variant="contained"
            sx={{ marginX: "auto" }}
            onClick={() => setVisibility(!visibility)}
          >
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
      </Grid>
    </Card>
  );
};

export default PatientInfoPage;
