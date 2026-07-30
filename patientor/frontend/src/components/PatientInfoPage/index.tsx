import type { Patient } from "../../types";
import { Card, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransGenderIcon from "@mui/icons-material/Female";
interface PatientProps {
  patient: Patient | undefined;
}
const PatientInfoPage = ({ patient }: PatientProps) => {
  if (!patient) return undefined;
  return (
    <Card sx={{ width: "20em", padding: "1em" }}>
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
    </Card>
  );
};

export default PatientInfoPage;
