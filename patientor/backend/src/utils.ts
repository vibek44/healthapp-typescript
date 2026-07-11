import type { NewPatientEntry } from "./types.ts";

const isString = (str: unknown): str is string => {
  return typeof str === "string";
};
const parseEntry = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error("Incorrect or missing content");
  }
  return str;
};

export const parsePatientEntry = (entry: unknown): NewPatientEntry => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in entry &&
    "occupation" in entry &&
    "dateOfBirth" in entry &&
    "gender" in entry &&
    "ssn" in entry
  ) {
      const newEntry: NewPatientEntry = {
        name: parseEntry(entry.name),
        dateOfBirth: parseEntry(entry.dateOfBirth),
        ssn: parseEntry(entry.ssn),
        occupation: parseEntry(entry.occupation),
        gender: parseEntry(entry.gender),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};
