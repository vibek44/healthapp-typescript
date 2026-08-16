import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
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

const BaseEntryForm = () => {
  const [entryType, setEntryType] = useState<string>("");
  const handleSetEntryType = (value: string) => setEntryType(value);
  return (
    <>
      <Typography variant="h5">New Entry Form</Typography>
      <Divider sx={{ marginY: "1em" }} />
      <FormControl fullWidth>
        <InputLabel>select entry</InputLabel>
        <Select
          value={entryType}
          onChange={({ target }) => handleSetEntryType(target.value)}
        >
          <MenuItem value="HealthCheck">HelathCheck Entry</MenuItem>
          <MenuItem value="Hospital">Hospital Entry</MenuItem>
          <MenuItem value="Occupational">Occupational Entry</MenuItem>
        </Select>
      </FormControl>

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
    </>
  );
};

const AddEntryForm = ({ handleVisibility }: Props) => (
  <div>
    <form
      style={{
        display: "grid",
        gap: "1em",
        border: "2px dashed ",
        padding: "3em",
      }}
    >
      <BaseEntryForm />
      <Grid container justifyContent="space-between">
        <Button variant="contained">SUBMIT</Button>
        <Button
          onClick={handleVisibility}
          variant="contained"
          color="secondary"
        >
          CANCEL
        </Button>
      </Grid>
    </form>
  </div>
);

export default AddEntryForm;
