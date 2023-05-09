import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { DialogTitle, DialogContent, TextField } from "@mui/material";

export default function AddTraining({ addTraining }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
      duration: "",
      activity: "",
      customer: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAdd = () => {
    setOpen(false);
    addTraining(training);
    setTraining({
      ...training,
      date: "",
      duration: "",
      activity: "",
      customer: "",
    });
  };
  const handleCancel = () => {
    setOpen(false);
    setTraining({
        ...training,
        date: "",
        duration: "",
        activity: "",
        customer: "",
      });
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  const inputChanged = (event) => {
    console.log("inputti changed");
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined">
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>Add Training</DialogTitle>

          <TextField
            autoFocus={true}
            value={training.date}
            onChange={inputChanged}
            margin="dense"
            label="Date"
            name="date"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            autoFocus={true}
            value={training.duration}
            onChange={inputChanged}
            margin="dense"
            label="Duration"
            name="duration"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            autoFocus={true}
            value={training.activity}
            onChange={inputChanged}
            margin="dense"
            label="Activity"
            name="activity"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            autoFocus={true}
            value={training.customer}
            onChange={inputChanged}
            margin="dense"
            label="Customer"
            name="customer"
            fullWidth={true}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}