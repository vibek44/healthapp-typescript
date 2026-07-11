import diagnosesData from "../../data/diagnoses.ts";
import type { Diagnoses } from "../types.ts";

const getDiagnosesData = (): Diagnoses[] => {
  return diagnosesData;
};

export default {
  getDiagnosesData,
};
