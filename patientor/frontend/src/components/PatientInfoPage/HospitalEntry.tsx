import type { HospitalEntryProps } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HospitalEntryDetails = ({ entry, diagnoses }: HospitalEntryProps) => {
  return (
    <div>
      <p>
        {entry.date}
        <LocalHospitalIcon sx={{ verticalAlign: "middle" }} />
      </p>
      <p>{entry.description}</p>
      <p>diagnose by: {entry.specialist}</p>
      <ul>
        {entry.diagnosisCodes?.map((el) => {
          return diagnoses?.map((diagnose) => {
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

export default HospitalEntryDetails;
