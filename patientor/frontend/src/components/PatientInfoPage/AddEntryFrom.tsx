import { TextField, Button, Grid, Typography, Divider } from "@mui/material";
interface Props {
  handleVisibility: () => void;
}
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
      <Typography variant="h5">New Entry</Typography>
      <Divider sx={{ marginY: "1em" }} />
      <TextField label="Date" />
      <TextField label="Description" />
      <TextField label="Specialist" />
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
