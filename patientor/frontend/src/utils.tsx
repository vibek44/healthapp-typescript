const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry case ${value}`);
};
export const getDefaultValues = (entryType: unknown) => {
  const base = {
    type: entryType,
    date: "",
    description: "",
    specialist: "",
    diagnosisCodes: "",
  };
  if (typeof entryType !== "string") throw new Error("not string type");
  if (
    entryType === "Hospital" ||
    entryType === "HealthCheck" ||
    entryType === "OccupationalHealthcare"
  ) {
    switch (entryType) {
      case "HealthCheck":
        return { ...base, healthCheckRating: 0 };
      case "Hospital":
        return { ...base, dischargeDate: "", criteria: "" };
      case "OccupationalHealthcare":
        return { ...base, employerName: "", startDate: "", endDate: "" };
      default:
        return assertNever(entryType);
    }
  }
};
