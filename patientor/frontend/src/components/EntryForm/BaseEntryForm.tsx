import {
  TextField,
  Grid,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { HealthCheckRating } from "../../types";

interface BaseEntryProps {
  entryType: string;
  handleVisibility: () => void;
}
const BaseEntryForm = ({ entryType, handleVisibility }: BaseEntryProps) => {
  if (!entryType) return null;
  const [rating, setRating] = useState<number>(0);
  return (
    <>
      <TextField
        required
        size="small"
        label="Date"
        type="date"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField required size="small" label="Description" />
      <TextField required size="small" label="Specialist" />
      <TextField
        size="small"
        placeholder="L20, Z74.3"
        label="Diagnosis Codes(comma separated)"
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
};

export default BaseEntryForm;
