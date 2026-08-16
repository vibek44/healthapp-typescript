import type { OccupationalHealthcareEntryProps } from "../../types";
import WorkIcon from "@mui/icons-material/Work";

const OccupationalHealthcare = ({
  entry,
  diagnoses,
}: OccupationalHealthcareEntryProps) => {
  return (
    <div>
      <p>
        {entry.date} <WorkIcon sx={{ verticalAlign: "middle" }} />{" "}
        {entry.employerName}
      </p>
      <p>{entry.description}</p>
      <p>diagnose by: {entry.specialist}</p>
      {}
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

export default OccupationalHealthcare;
