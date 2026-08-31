import type { EntryFormValues } from "./types";

const assertNever = (value: never): never => {
  throw new Error(`unhandled Case ${value}`);
};

const getDefaultValues = (
  entryType: EntryFormValues["type"]
): EntryFormValues => {
  if (typeof entryType !== "string") throw new Error("not string type");
  if (
    entryType !== "HealthCheck" &&
    entryType !== "Hospital" &&
    entryType !== "OccupationalHealthcare"
  )
    throw new Error("not entry type");

  switch (entryType) {
    case "Hospital":
      return {
        type: "Hospital",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        dischargeDate: "",
        criteria: "",
      };
    case "HealthCheck":
      return {
        type: "HealthCheck",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0,
      };
    case "OccupationalHealthcare":
      return {
        type: "OccupationalHealthcare",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        startDate: "",
        endDate: "",
      };
    default:
      return assertNever(entryType);
  }
};

export default getDefaultValues;
