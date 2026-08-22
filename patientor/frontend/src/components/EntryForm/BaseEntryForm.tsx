import { TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { getDefaultValues } from "../../utils";
import { useEffect } from "react";
import type { EntryFormValues } from "../../types";

//import { HealthCheckRating } from "../../types";

interface BaseEntryProps {
  entryType: string;
  handleVisibility: () => void;
}
const BaseEntryForm = ({ entryType, handleVisibility }: BaseEntryProps) => {
  const {
    control,
    reset,
    formState: { errors },
  } = useForm<EntryFormValues>({ defaultValues: getDefaultValues(entryType) });
  useEffect(() => {
    if (entryType) {
      reset(getDefaultValues(entryType));
    }
  }, [entryType, reset]);
  // console.log(formState);

  if (!entryType) return null;

  return (
    <>
      <Controller
        name="date"
        control={control}
        rules={{ required: "Date is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            type="date"
            label="date"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.date}
            helperText={errors.date?.message}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{
          required: "Description is required",
          minLength: 6,
          maxLength: {
            value: 30,
            message: "description cannot  exceed 30 charactor",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            label="description"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />
      <Controller
        name="specialist"
        control={control}
        rules={{
          required: "specialist is required",
          minLength: 3,
          maxLength: 15,
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            label="specialist"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.specialist}
            helperText={errors.specialist?.message}
          />
        )}
      />
      <Controller
        name="diagnosisCodes"
        control={control}
        rules={{
          validate: {
            checkAlphaCase: (value) => {
              const testValues = value.replace(/[0-9.,]/g, "");
              return (
                /^[A-Za-z]+$/g.test(testValues) ||
                "Code cant have invalid characters"
              );
            },
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            label="diagnosisCodes"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        )}
      />
      {entryType === "HealthCheck" && <></>}

      {entryType === "Hospital" && <></>}
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
