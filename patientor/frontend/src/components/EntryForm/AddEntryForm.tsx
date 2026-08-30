import { useForm, SubmitHandler, Controller } from "react-hook-form";
import BaseEntryForm from "./BaseEntryForm";
import type { EntryFormValues, Diagnoses, Patient } from "../../types";

import {
  Typography,
  Divider,
  MenuItem,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { getDefaultValues } from "../../utils";
interface Props {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  handleVisibility: () => void;
  diagnoses: Diagnoses[];
}

const AddEntryForm = ({
  handleVisibility,
  diagnoses,
  patient,
  setPatient,
}: Props) => {
  let entryType: EntryFormValues["type"] = "HealthCheck";

  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EntryFormValues>({ defaultValues: getDefaultValues(entryType) });

  entryType = watch("type");

  const onSubmit: SubmitHandler<EntryFormValues> = (data: EntryFormValues) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "grid",
        gap: "1em",
        border: "2px dashed ",
        padding: "3em",
      }}
    >
      <Typography variant="h5">New Entry Form</Typography>
      <Divider />
      {entryType && (
        <Typography variant="subtitle1" color="info" fontFamily="unset">
          Field with * are required
        </Typography>
      )}
      <Divider sx={{ marginY: "1em" }} />
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            value={field.value ?? ""}
            onChange={(e) => {
              const newValue = e.target.value as EntryFormValues["type"];
              field.onChange(newValue);
              reset(getDefaultValues(newValue));
            }}
            label="Select Entry-Type"
          >
            <MenuItem value="">Select Entry type </MenuItem>
            <MenuItem value="HealthCheck">HelathCheck </MenuItem>
            <MenuItem value="Hospital">Hospital </MenuItem>
            <MenuItem value="OccupationalHealthcare">
              OccupationalHealthcare
            </MenuItem>
          </TextField>
        )}
      />

      {entryType && (
        <BaseEntryForm
          entryType={entryType}
          control={control}
          errors={errors}
          diagnoses={diagnoses}
        />
      )}
      {entryType && (
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
      )}
    </form>
  );
};

export default AddEntryForm;
