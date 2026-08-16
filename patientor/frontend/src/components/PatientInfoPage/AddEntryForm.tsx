import { useState } from "react";
//import BaseEntryForm from "./BaseEntryForm";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
interface Props {
  handleVisibility: () => void;
}

const AddEntryForm = ({ handleVisibility }: Props) => {
  const [entryType, setEntryType] = useState<string>("");
  const handleSetEntryType = (value: string) => setEntryType(value);
  console.log(entryType);
  return (
    <div>
      <form
        style={{
          display: "grid",
          gap: "1em",
          border: "2px dashed ",
          padding: "3em",
        }}
      >
        <Typography variant="h5">New Entry Form</Typography>
        <Divider sx={{ marginY: "1em" }} />
        <FormControl fullWidth>
          <InputLabel>select entry</InputLabel>
          <Select
            value={entryType}
            onChange={({ target }) => handleSetEntryType(target.value)}
          >
            <MenuItem value="HealthCheck">HelathCheck </MenuItem>
            <MenuItem value="Hospital">Hospital </MenuItem>
            <MenuItem value="OccupationalHealthcare">
              OccupationalHealthcare
            </MenuItem>
          </Select>
        </FormControl>

        {entryType && (
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
            <TextField size="small" label="Diagnosis Codes(comma separated)" />
            <Grid container justifyContent="space-between">
              <Button variant="contained" type="submit">
                SUBMIT
              </Button>
              <Button
                onClick={handleVisibility}
                variant="contained"
                color="secondary"
                type="button"
              >
                CANCEL
              </Button>
            </Grid>
          </>
        )}
      </form>
    </div>
  );
};

export default AddEntryForm;
