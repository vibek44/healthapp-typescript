import { Controller, useForm } from "react-hook-form";
import BaseEntryForm from "./BaseEntryForm";
import type { Diagnoses, EntryFormValues, Patient } from "../../types";
import {
  Typography,
  Divider,
  MenuItem,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import getDefaultValues from "../../utils";
import patientService from "../../services/patients";
import axios from "axios";

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
  const {
    control,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<EntryFormValues>({
    defaultValues: getDefaultValues("HealthCheck"),
  });
  const entryType = watch("type");
  const onSubmit = async (data: EntryFormValues) => {
    try {
      if (data.type === "Hospital") {
        const { dischargeDate, criteria, ...rest } = data;
        const hospitalData = {
          ...rest,
          discharge: { date: dischargeDate, criteria },
        };
        const result = await patientService.createEntry(
          hospitalData,
          patient.id
        );

        setPatient({ ...patient, entries: [...patient.entries, result] });
        handleVisibility();
        return;
      }
      if (data.type === "OccupationalHealthcare") {
        const { startDate, endDate, ...rest } = data;
        const occupationalData = {
          ...rest,
          sickLeave: { startDate, endDate },
        };
        const result = await patientService.createEntry(
          occupationalData,
          patient.id
        );
        setPatient({ ...patient, entries: [...patient.entries, result] });
        handleVisibility();
        return;
      }
      if (data.type === "HealthCheck") {
        const result = await patientService.createEntry(data, patient.id);
        setPatient({ ...patient, entries: [...patient.entries, result] });
        handleVisibility();
        return;
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
        } else {
          console.log("unrecognized error");
        }
      } else {
        console.error("Unknown error", e);
      }
    }
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
            value={field.value ?? ""}
            onChange={(e) => {
              const newType = e.target.value as EntryFormValues["type"];
              reset(getDefaultValues(newType));
            }}
            select
            label="Select Entry-Type"
          >
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
