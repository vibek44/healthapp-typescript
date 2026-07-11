import { v1 as uuid } from "uuid";
import patientData from "../../data/patients.ts";
import type { PatientEntry, Patient, NewPatientEntry } from "../types.ts";
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

const addPatientData = (entry: NewPatientEntry): Patient => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  data.push(newEntry);
  return newEntry;
};

export default {
  getPatientData,
  addPatientData,
};
