import { v1 as uuid } from "uuid";
import type { PatientEntry, Patient, NewPatientEntry } from "../types.ts";
import patientData from "../../data/patients.ts";

const data: Patient[] = patientData;
const getPatientData = (): PatientEntry[] => {
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

const addPatientData = (entry: NewPatientEntry): Patient => {
  const newEntry = {
    id: uuid(),
    entries: [],
    ...entry,
  };
  data.push(newEntry);
  return newEntry;
};

export default {
  getPatientData,
  addPatientData,
  getSinglePatientData,
};
