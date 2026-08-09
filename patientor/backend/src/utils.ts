import type {
  EntryWithoutId,
  OccupationalEntryWithoutId,
  Diagnoses,
} from "./types.ts";

/*
const isString = (str: unknown): str is string => {
  return typeof str === "string";
};

const isDate = (date:string):boolean => {
   return Boolean(Date.parse(date))
}

const isGender = (gender:string):gender is Gender => {
  return (Object.values(GenderObject) as string[]).includes(gender)
}
const parseGender = (gender:unknown):Gender => {
  if(!isString (gender)|| !isGender(gender)){
    throw new Error("Incorrect or missing gender content "+gender);
  }
  return gender
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
*/
const isString = (text: unknown): text is string => {
  return typeof text === "string";
};
const isDate = (
  date1: string,
  date2: string | undefined = undefined
): boolean => {
  if (!date2) return Boolean(Date.parse(date1));
  const parsedDate1 = Date.parse(date1);
  const parsedDate2 = Date.parse(date2);
  if (
    Boolean(parsedDate1) &&
    Boolean(parsedDate2) &&
    parsedDate2 > parsedDate1
  ) {
    return true;
  }
  throw new Error("Incorrect startDate and endDate");
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnoses["code"]> => {
  if (Array.isArray(codes) && codes.every((code) => typeof code === "string")) {
    return codes;
  }
  throw new Error("Incorrect or missing diagnosis code");
};
const parseSickLeave = (
  sickLeave: unknown
): { startDate: string; endDate: string } => {
  if (
    sickLeave &&
    typeof sickLeave === "object" &&
    Object.keys(sickLeave).length === 2 &&
    "startDate" in sickLeave &&
    "endDate" in sickLeave
  ) {
    if (
      isString(sickLeave.startDate) &&
      isString(sickLeave.endDate) &&
      isDate(sickLeave.startDate, sickLeave.endDate)
    ) {
      return {
        startDate: sickLeave.startDate,
        endDate: sickLeave.endDate,
      };
    }
  }
  throw new Error("invalid start and end date");
};
const parseDate = (text: unknown): string => {
  if (!isString(text) || !isDate(text)) {
    throw new Error("Incorrect or missing date content");
  }
  return text;
};

const parseString = (str: unknown): string => {
  if (!isString(str)) throw new Error("invalid description:");
  return str;
};
const parseOccupationalEntry = (
  entry: EntryWithoutId
): OccupationalEntryWithoutId => {
  if (
    "type" in entry &&
    entry.type === "OccupationalHealthcare" &&
    "description" in entry &&
    "employerName" in entry &&
    "date" in entry &&
    "specialist" in entry
  ) {
    const newEntry: OccupationalEntryWithoutId = {
      type: entry.type,
      description: parseString(entry.description),
      specialist: parseString(entry.specialist),
      employerName: parseString(entry.employerName),
      date: parseDate(entry.date),
      ...(entry.diagnosisCodes?.length !== 0
        ? { diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes) }
        : {}),
      ...(entry.sickLeave
        ? { sickLeave: parseSickLeave(entry.sickLeave) }
        : {}),
    };

    return newEntry;
  }
  throw new Error("Invalid OccupationalHealthcare entry");
};

const isEntry = (e: unknown): e is EntryWithoutId => {
  if (typeof e !== "object" || e === null) return false;
  return (
    "type" in e &&
    typeof e.type === "string" &&
    (e.type === "HealthCheck" ||
      e.type === "OccupationalHealthcare" ||
      e.type === "Hospital")
  );
};

const assertNever = (entry: never): never => {
  throw new Error(`unhandle cases or extra cases not handled  ${entry} `);
};
export const parseNewEntry = (entry: unknown) => {
  if (!entry || typeof entry !== "object" || Object.keys(entry).length === 0) {
    throw new Error("No entry data provided");
  }
  if (isEntry(entry)) {
    switch (entry.type) {
      case "OccupationalHealthcare":
        return parseOccupationalEntry(entry);
      case "HealthCheck":
        return parseHealthCheckEntry(entry);
      case "Hospital":
        return parseHospitalEntry(entry);
      default:
        return assertNever(entry);
    }
  }
  throw new Error("Invalid entry: missing or invalid 'type' field");
};
