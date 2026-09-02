import { useState } from "react";
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
  Alert,
} from "@mui/material";
import getDefaultValues from "../../utils";
import patientService from "../../services/patients";
import axios from "axios";
interface Error {
  message: string;
  path: string[];
}
interface Props {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  onClose: () => void;
  diagnoses: Diagnoses[];
}

const AddEntryForm = ({ onClose, diagnoses, patient, setPatient }: Props) => {
  const [error, setError] = useState<string[] | string | undefined>(undefined);
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
        onClose();
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
        onClose();
        return;
      }
      if (data.type === "HealthCheck") {
        const result = await patientService.createEntry(data, patient.id);
        setPatient({ ...patient, entries: [...patient.entries, result] });
        onClose();
        return;
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.log(e.response);
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          setError(message);
        } else if (e?.response?.data && typeof e?.response?.data === "object") {
          if (Array.isArray(e.response.data.error)) {
            const customError = e.response.data.error.map((el: Error) => (
              <li key={el.path[0]} style={{ color: "red" }}>
                {el.path[0]}:{el.message}
              </li>
            ));
            setError(customError);
          }
        } else {
          setError("unrecognized error");
        }
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "grid",
        gap: "1em",
        border: "2px",
        padding: "4em",
      }}
    >
      {error && <Alert severity="error">{error}</Alert>}

      {entryType && (
        <Typography
          sx={{ margin: "auto" }}
          variant="subtitle1"
          color="info"
          fontFamily="unset"
        >
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
              const newType = e.target.value as EntryFormValues["type"];
              reset(getDefaultValues(newType));
            }}
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
        <Grid marginTop={"2em"} container justifyContent="space-between">
          <Button variant="contained" type="submit">
            SUBMIT
          </Button>
          <Button
            onClick={onClose} //handleVisibility
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
