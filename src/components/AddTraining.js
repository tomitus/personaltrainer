import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DialogTitle, DialogContent, TextField } from "@mui/material";

function getStyles(name, firstname, theme) {
    return {
      fontWeight:
      firstname.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

export default function AddTraining({ addTraining, trainings, fetchTrainings }) {
    const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    id: "",
    date: "",
      duration: "",
      activity: "",
      customer: "",
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAdd = () => {
    setOpen(false);
    addTraining(training);
    fetchTrainings();
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
        id: "",
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

  const dateChanged = (date) => {
    console.log("date changed");
    setTraining({ ...training, date});
  };

  const nameChanged = (event) => {
    console.log("name changed");
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
          <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            autoFocus={true}
            value={training.date}
            onChange={dateChanged}
            margin="dense"
            label="Date"
            name="date"
            fullWidth={true}
            variant="standard"
          />
          </LocalizationProvider>
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
          <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="Customers">Customers</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="customer"
          
          value={`${training.customer.firstname} ${training.customer.lastname}`}
          onChange={nameChanged}
          input={<OutlinedInput label="Customer" />}
          MenuProps={MenuProps}
        >
            console.log(customer.firstname);
            {trainings && trainings.length > 0 && trainings.map((customer) => (
            <MenuItem
              key={training.customer}
              value={`${customer.firstname} ${customer.lastname}`}
            >
              {customer.firstname} {customer.lastname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}