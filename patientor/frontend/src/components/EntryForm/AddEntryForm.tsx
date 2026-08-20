import { useState } from "react";
import BaseEntryForm from "./BaseEntryForm";

import {
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
  //console.log(entryType);
  return (
    <form
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
        <BaseEntryForm
          entryType={entryType}
          handleVisibility={handleVisibility}
        />
      )}
    </form>
  );
};

export default AddEntryForm;
