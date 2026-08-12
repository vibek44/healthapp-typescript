import { v1 as uuid } from "uuid";
import type {
  NonSensitivePatientData,
  Patient,
  PatientEntry,
  EntryNoId,
} from "../types.ts";
import patientData from "../../data/patients.ts";

const data: Patient[] = patientData;
const getPatientData = (): NonSensitivePatientData[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getSinglePatientData = (id: string): Patient | undefined => {
  const data1 = data.find((el) => el.id === id);
  if (!data1) return undefined;
  else return data1;
};

const addPatientData = (patient: PatientEntry): Patient => {
  const newEntry = {
    id: uuid(),
    entries: [],
    ...patient,
  };
  data.push(newEntry);
  return newEntry;
};

const addPatientEntry = (id: string, entry: EntryNoId) => {};

export default {
  getPatientData,
  addPatientData,
  getSinglePatientData,
  addPatientEntry,
};
