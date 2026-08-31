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

  const baseField = {
    date: "",
    description: "",
    specialist: "",
    diagnosisCodes: [],
  };

  switch (entryType) {
    case "Hospital":
      return {
        ...baseField,
        type: entryType,
        dischargeDate: "",
        criteria: "",
      };
    case "HealthCheck":
      return {
        ...baseField,
        type: entryType,
        healthCheckRating: 0,
      };
    case "OccupationalHealthcare":
      return {
        ...baseField,
        type: entryType,
        employerName: "",
        startDate: "",
        endDate: "",
      };
    default:
      return assertNever(entryType);
  }
};

export default getDefaultValues;
