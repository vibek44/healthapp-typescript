import { useForm } from "react-hook-form";
import { getDefaultValues } from "../../utils";
import { useEffect } from "react";
import type { EntryFormValues } from "../../types";

//import { HealthCheckRating } from "../../types";

interface BaseEntryProps {
  entryType: string;
  handleVisibility: () => void;
}
const BaseEntryForm = ({ entryType, handleVisibility }: BaseEntryProps) => {
  const { register, reset, formState } = useForm<EntryFormValues>({
    defaultValues: getDefaultValues(entryType),
  });
  useEffect(() => {
    reset(getDefaultValues(entryType));
  }, [entryType, reset]);
  // console.log(formState);

  console.log(formState);
  if (!entryType) return null;

  return (
    <>
      <input
        {...register("date", {
          required: "Date is required",
        })}
        type="date"
      />
      <input
        {...register("description", {
          required: "description is required",
        })}
        type="text"
        placeholder="Description"
      />
      <input
        {...register("specialist", {
          required: "specialist is required",
        })}
        type="text"
        placeholder="Specialist"
      />
      <input
        {...register("diagnosisCodes")}
        type="text"
        placeholder="DiagnosisCodes"
      />
      {entryType === "HealthCheck" && (
        <>
          <select {...register("healthCheckRating")}>
            <option value={0}>Healthy</option>
          </select>
        </>
      )}
      {entryType === "Hospital" && (
        <>
          <input type="date" {...register("dischargeDate")} />
          <input type="text" {...register("criteria")} />
        </>
      )}
    </>
  );
};

export default BaseEntryForm;

/*
  const [rating, setRating] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeave, setSickLeave] = useState<{
    startDate: string;
    endDate: string;
  }>({ startDate: "", endDate: "" });
  const [discharge, setDischarge] = useState<{
    date: string;
    criteria: string;
  }>({
    date: "",
    criteria: "",
  });

  console.log(diagnosisCodes, date);

  return (
    <>
      <TextField
        required
        size="small"
        label="Date"
        type="date"
        value={date}
        onChange={({ target }) => setDate(target.value)}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        required
        size="small"
        type="text"
        label="Description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        required
        size="small"
        type="text"
        label="Specialist"
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField
        size="small"
        placeholder="L20, Z74.3"
        label="Diagnosis Codes(comma separated)"
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value.split(","))}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />

      {entryType === "Hospital" && (
        <>
          <TextField
            required
            type="date"
            label="Discharge date"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField required type="text" label="criteria" />
        </>
      )}
      {entryType === "HealthCheck" && (
        <FormControl fullWidth>
          <InputLabel>Health rating</InputLabel>
          <Select
            value={rating}
            onChange={({ target }) => setRating(target.value)}
          >
            {Object.entries(HealthCheckRating).map((el) => (
              <MenuItem value={el[1]}>
                {el[1]}-{el[0]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {entryType === "OccupationalHealthcare" && (
        <>
          <TextField required type="text" label="Employer name" />
          <TextField
            type="date"
            label="Leave Startdate"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            type="date"
            label="Leave EndDate"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </>
      )}

      <Grid container justifyContent="space-between">
        <Button variant="contained" type="submit">
          SUBMIT
        </Button>
        <Button
          onClick={handleVisibility} //handleVisibility
          variant="contained"
          color="secondary"
          type="button"
        >
          CANCEL
        </Button>
      </Grid>
    </>
  );

  */
