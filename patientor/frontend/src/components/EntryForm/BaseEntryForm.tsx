import { TextField, MenuItem, Autocomplete } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import type { EntryFormValues, Diagnoses } from "../../types";
import { HealthCheckRating } from "../../types";

interface BaseEntryProps {
  entryType: string;
  control: Control<EntryFormValues>;
  errors: FieldErrors<EntryFormValues>;
  diagnoses: Diagnoses[];
}
const BaseEntryForm = ({
  entryType,
  control,
  errors,
  diagnoses,
}: BaseEntryProps) => {
  if (!entryType) return null;
  console.log(diagnoses);
  return (
    <>
      <Controller
        name="date"
        defaultValue=""
        control={control}
        rules={{ required: "Date is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            type="date"
            label="date"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors?.date}
            helperText={errors?.date?.message}
          />
        )}
      />
      <Controller
        name="description"
        defaultValue=""
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
            error={!!errors?.description}
            helperText={errors?.description?.message}
          />
        )}
      />
      <Controller
        name="specialist"
        defaultValue=""
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
            error={!!errors?.specialist}
            helperText={errors?.specialist?.message}
          />
        )}
      />

      <Controller
        name="diagnosisCodes"
        defaultValue={[]}
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <Autocomplete
            {...field}
            multiple
            options={diagnoses}
            getOptionLabel={(option) => `${option.code} - ${option.name}`}
            isOptionEqualToValue={(option, val) => option.code === val.code}
            value={diagnoses.filter((d) => (value || []).includes(d.code))}
            onChange={(_, newValue) => onChange(newValue.map((v) => v.code))}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Diagnosis Codes"
                error={!!errors?.diagnosisCodes}
                helperText={errors?.diagnosisCodes?.message}
              />
            )}
          />
        )}
      />

      {entryType === "HealthCheck" && (
        <Controller
          name="healthCheckRating"
          defaultValue={0}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="rating"
              type="text"
              value={field.value ?? 0}
              error={!!errors?.healthCheckRating}
              helperText={errors?.healthCheckRating?.message}
            >
              {Object.entries(HealthCheckRating).map(([key, value]) => (
                <MenuItem key={value} value={value}>
                  {key} - {value}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      )}
      {entryType === "Hospital" && (
        <>
          <Controller
            name="dischargeDate"
            defaultValue=""
            control={control}
            rules={{ required: "DischargeDate is missing" }}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                label="dischargeDate"
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors?.dischargeDate}
                helperText={errors?.dischargeDate?.message}
              />
            )}
          />
          <Controller
            name="criteria"
            defaultValue=""
            control={control}
            rules={{ required: "criteria is missing" }}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="criteria"
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors?.criteria}
                helperText={errors?.criteria?.message}
              />
            )}
          />
        </>
      )}
      {entryType === "OccupationalHealthcare" && (
        <>
          <Controller
            name="employerName"
            defaultValue=""
            control={control}
            rules={{ required: "Employername is missing" }}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="Employer-Name"
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors?.employerName}
                helperText={errors?.employerName?.message}
              />
            )}
          />
          <Controller
            name="startDate"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                label="startDate"
                slotProps={{ inputLabel: { shrink: true } }}
              />
            )}
          />
          <Controller
            name="endDate"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                label="endDate"
                slotProps={{ inputLabel: { shrink: true } }}
              />
            )}
          />
        </>
      )}
    </>
  );
};

export default BaseEntryForm;
