import { TextField, Button, Grid, Typography, Divider } from "@mui/material";
interface Props {
  handleSetEntry: (value: string) => void;
}
const AddEntryForm = ({ handleSetEntry }: Props) => (
  <div>
    <form
      style={{
        display: "grid",
        gap: "1em",
        border: "2px dashed ",
        padding: "3em",
      }}
    >
      <Typography variant="h5">New Entry</Typography>
      <Divider sx={{ marginY: "1em" }} />
      <TextField required size="small" label="Date" />
      <TextField required size="small" label="Description" />
      <TextField required size="small" label="Specialist" />
      <TextField size="small" label="Diagnosis Codes(comma separated)" />
      <Grid container justifyContent="space-between">
        <Button variant="contained">SUBMIT</Button>
        <Button
          onClick={() => handleSetEntry("")}
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
