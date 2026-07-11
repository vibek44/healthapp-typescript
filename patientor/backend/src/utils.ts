
import type { NewPatientEntry } from "./types.ts";

const isString = (str: unknown): str is string => {
  return typeof str === "string";
};

const isDate = (str:string):boolean => {
   return Boolean(Date.parse(str))
}

const parseDate=(str:unknown):string=>{
  if(!isString(str) || !isDate(str)){
    throw new Error("Incorrect or missing date content");
  }
  return str
}
const parseEntry = (str: unknown): string => {
  if (!isString(str)) {
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
        dateOfBirth: parseDate(entry.dateOfBirth),
        ssn: parseEntry(entry.ssn),
        occupation: parseEntry(entry.occupation),
        gender: parseEntry(entry.gender),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};
