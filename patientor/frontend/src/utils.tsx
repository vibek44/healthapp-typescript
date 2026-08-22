const assertNever = (value: never): never => {
  throw new Error(`unhandled Case ${value}`);
};
export const getDefaultValues = (entryType: unknown) => {
  if (typeof entryType !== "string") throw new Error("not string type");
  if (
    entryType !== "HealthCheck" &&
    entryType !== "Hospital" &&
    entryType !== "OccupationalHealthcare"
  )
    throw new Error("not entry type");
  const base = {
    type: entryType,
    date: "",
    description: "",
    specialist: "",
    diagnosisCodes: "",
  };

  switch (entryType) {
    case "Hospital":
      return { ...base, dischargeDate: "", criteria: "" };
    case "HealthCheck":
      return { ...base, healthCheckRating: 0 };
    case "OccupationalHealthcare":
      return { ...base, employerName: "", startDate: "", endDate: "" };
    default:
      return assertNever(entryType);
  }
};
