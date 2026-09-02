import { TextField, MenuItem, Autocomplete, Chip } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import type {
  EntryFormValues,
  Diagnoses,
  HealthCheckFormValues,
  HospitalFormValues,
  OccupationalHealthcareFormValues,
} from "../../types";
import { HealthCheckRating } from "../../types";

interface BaseEntryProps {
  entryType: EntryFormValues["type"];
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
  //console.log(diagnoses);
  return (
    <>
      <Controller
        name="date"
        control={control}
        rules={{ required: "Date is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            required
            type="date"
            label="Date"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors?.date}
            helperText={errors?.date?.message}
          />
        )}
      />
      <Controller
        name="specialist"
        control={control}
        rules={{
          required: "specialist is required",
          minLength: {
            value: 3,
            message: "specialist should be atleast 3 character long",
          },
          maxLength: { value: 20, message: "maximum 20 character" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            required
            type="text"
            label="Specialist"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors?.specialist}
            helperText={errors?.specialist?.message}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{
          required: "Description is required",
          minLength: {
            value: 6,
            message: "needs to be atleast 6 character long",
          },
          maxLength: {
            value: 60,
            message: "cannot  exceed 60 charactor",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            required
            type="text"
            label="Description"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors?.description}
            helperText={errors?.description?.message}
          />
        )}
      />

      <Controller
        name="diagnosisCodes"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <Autocomplete
            {...field}
            multiple
            options={diagnoses}
            value={diagnoses.filter((d) => (value || []).includes(d.code))}
            onChange={(_, newValue) => onChange(newValue.map((v) => v.code))}
            getOptionLabel={(option) => `${option.code} - ${option.name}`}
            isOptionEqualToValue={(option, val) => option.code === val.code}
            renderValue={(selectedOptions, getTagProps) =>
              selectedOptions.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option.code}
                  label={option.code}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Diagnosis Codes"
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors?.diagnosisCodes}
                helperText={errors?.diagnosisCodes?.message}
              />
            )}
          />
        )}
      />
      {entryType === "HealthCheck" &&
        (() => {
          const healthCheckErrors =
            errors as FieldErrors<HealthCheckFormValues>;
          return (
            <Controller
              name="healthCheckRating"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="rating"
                  type="text"
                  value={field.value ?? 0}
                  error={!!healthCheckErrors?.healthCheckRating}
                  helperText={healthCheckErrors?.healthCheckRating?.message}
                >
                  {Object.entries(HealthCheckRating).map(([key, value]) => (
                    <MenuItem key={value} value={value}>
                      {key} - {value}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          );
        })()}
      {entryType === "Hospital" &&
        (() => {
          const hospitalErrors = errors as FieldErrors<HospitalFormValues>;
          return (
            <>
              <Controller
                name="dischargeDate"
                control={control}
                rules={{ required: "DischargeDate is missing" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    type="date"
                    label="dischargeDate"
                    slotProps={{ inputLabel: { shrink: true } }}
                    error={!!hospitalErrors?.dischargeDate}
                    helperText={hospitalErrors?.dischargeDate?.message}
                  />
                )}
              />
              <Controller
                name="criteria"
                control={control}
                rules={{
                  required: "criteria is missing",
                  validate: (val) => {
                    if (val)
                      return (
                        val.length > 10 ||
                        "criteria field needs proper explanation"
                      );
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    type="text"
                    label="criteria"
                    slotProps={{ inputLabel: { shrink: true } }}
                    error={!!hospitalErrors?.criteria}
                    helperText={hospitalErrors?.criteria?.message}
                  />
                )}
              />
            </>
          );
        })()}
      {entryType === "OccupationalHealthcare" &&
        (() => {
          const occupationalErrors =
            errors as FieldErrors<OccupationalHealthcareFormValues>;
          return (
            <>
              <Controller
                name="employerName"
                control={control}
                rules={{ required: "Employername is missing" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    type="text"
                    label="Employer-Name"
                    slotProps={{ inputLabel: { shrink: true } }}
                    error={!!occupationalErrors?.employerName}
                  />
                )}
              />
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="StartDate"
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
                    label="EndDate"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                )}
              />
            </>
          );
        })()}
    </>
  );
};

export default BaseEntryForm;
