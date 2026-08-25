import { TextField, MenuItem } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import type { EntryFormValues } from "../../types";
import { HealthCheckRating } from "../../types";

interface BaseEntryProps {
  entryType: string;
  control: Control<EntryFormValues>;
  errors: FieldErrors<EntryFormValues>;
}
const BaseEntryForm = ({ entryType, control, errors }: BaseEntryProps) => {
  if (!entryType) return null;

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
        defaultValue=""
        control={control}
        rules={{
          validate: {
            checkAlphaCase: (value) => {
              if (!value) return true;
              const testValues = value.replace(/[0-9.,]/g, "");
              return /^[A-Za-z]+$/g.test(testValues) || "invalid code";
            },
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            label="diagnosisCodes"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors?.diagnosisCodes}
            helperText={errors?.diagnosisCodes?.message}
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
