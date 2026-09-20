import { Dialog, DialogTitle, Divider } from "@mui/material";
import AddEntryForm from "./AddEntryForm";
import type { Patient, Diagnoses } from "../../types";
interface AddEntryProps {
  open: boolean;
  onClose: () => void;
  id: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  diagnoses: Diagnoses[];
}

const AddEntryModal = ({
  open,
  onClose,
  id,
  setPatient,
  diagnoses,
}: AddEntryProps) => {
  return (
    <Dialog fullWidth={true} open={open}>
      <DialogTitle sx={{ marginX: "auto" }}>New Entry Form</DialogTitle>
      <Divider sx={{ marginTop: "0.5em" }} />
      <AddEntryForm
        onClose={onClose}
        id={id}
        setPatient={setPatient}
        diagnoses={diagnoses}
      />
    </Dialog>
  );
};

export default AddEntryModal;
