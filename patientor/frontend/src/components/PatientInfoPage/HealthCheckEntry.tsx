import { type HealthCheckEntryProps } from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
const HealthCheckEntry = ({ entry, diagnoses }: HealthCheckEntryProps) => {
  return (
    <div>
      <p>
        {entry.date} <MedicalServicesIcon sx={{ verticalAlign: "middle" }} /> {}
      </p>
      <p>{entry.description}</p>
      <FavoriteIcon
        sx={{
          color:
            entry.healthCheckRating === 0
              ? "green"
              : entry.healthCheckRating === 1
              ? "yellow"
              : "red",
        }}
      />
      <p>diagnose by: {entry.specialist}</p>
      <ul>
        {entry.diagnosisCodes?.map((el) => {
          return diagnoses.map((diagnose) => {
            if (diagnose.code === el) {
              return (
                <li key={el}>
                  {el} {diagnose.name}
                </li>
              );
            }
          });
        })}
      </ul>
    </div>
  );
};

export default HealthCheckEntry;
