import axios from "axios";
import {
  Patient,
  PatientFormValues,
  Diagnoses,
  EntryWithoutId,
  Entry,
} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnoses[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};
const getIndividualPatientData = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const createPatient = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (object: EntryWithoutId, id: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

export default {
  getAll,
  createPatient,
  getIndividualPatientData,
  getDiagnoses,
  createEntry,
};
