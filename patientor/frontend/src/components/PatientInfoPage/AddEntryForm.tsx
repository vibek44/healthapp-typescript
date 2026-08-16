import { TextField, Button, Grid, Typography, Divider } from "@mui/material";
interface Props {
  handleSetEntry: (value: string) => void;
  entry: string;
}

const BaseEntryForm = () => (
  <>
    <Typography variant="h5">New Entry Form</Typography>
    <Divider sx={{ marginY: "1em" }} />
    <TextField
      required
      size="small"
      label="Date"
      defaultValue=""
      type="Date"
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

const AddEntryForm = ({ handleSetEntry, entry }: Props) => (
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
