import axios from "axios";
import { Patient, PatientFormValues, Diagnoses } from "../types";

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

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

export default {
  getAll,
  create,
  getIndividualPatientData,
  getDiagnoses,
};
