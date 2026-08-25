import { useForm, SubmitHandler, Controller } from "react-hook-form";
import BaseEntryForm from "./BaseEntryForm";
import type { EntryFormValues } from "../../types";

import {
  Typography,
  Divider,
  MenuItem,
  TextField,
  Grid,
  Button,
} from "@mui/material";
interface Props {
  handleVisibility: () => void;
}

const AddEntryForm = ({ handleVisibility }: Props) => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<EntryFormValues>();

  const entryType = watch("type");

  // console.log(for);
  // const formValues = watch();
  //console.log(formValues, entryType);

  const onSubmit = (data: EntryFormValues) => console.log(data);
  console.log(entryType);
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
        defaultValue=""
        control={control}
        render={({ field }) => (
          <TextField {...field} select label="Select Entry-Type">
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
