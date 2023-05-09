import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import moment from "moment";
import { DialogTitle, DialogContent, TextField } from "@mui/material";

export default function EditTraining({ editTraining, params }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
    setTraining({
        date: params.data.date,
        duration: params.data.duration,
        activity: params.data.activity,
        customer: params.data.customer,
    });
  };

  const handleEdit = () => {
    setOpen(false);
    editTraining(training, params.value);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputChanged = (event) => {
    console.log("inputti changed");
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const formattedDate = moment.utc(training.date).format("DD.MM.YYYY HH:mm");

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined">
        Edit training
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>Edit Training</DialogTitle>

          <TextField
            autoFocus={true}
            value={formattedDate}
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
            value={training.customer.firstname}
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
          <Button onClick={handleEdit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
