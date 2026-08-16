import type { EntryProps } from "../../types";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HospitalEntryDetails from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";

const assertNever = (entry: never): never => {
  throw new Error(`unexpected value ${entry}`);
};

const EntryDetails = ({ entry, diagnoses }: EntryProps) => {
  switch (entry.type) {
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    default:
      assertNever(entry);
  }
};

export default EntryDetails;
