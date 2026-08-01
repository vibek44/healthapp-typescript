import type { Patient } from "../../types";
import { Card, Divider, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransGenderIcon from "@mui/icons-material/Female";
interface PatientProps {
  patient: Patient | undefined;
}
const PatientInfoPage = ({ patient }: PatientProps) => {
  if (!patient) return undefined;
  console.log(patient);
  return (
    <Card sx={{ width: "30em", padding: "1em" }}>
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
          <>
            <p key={el.id}>
              {el.date} :{el.description}
            </p>
            {el.diagnosisCodes?.map((el) => (
              <li>{el}</li>
            ))}
          </>
        ))}
      </Typography>
    </Card>
  );
};

export default PatientInfoPage;
