import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DialogTitle, DialogContent, TextField } from "@mui/material";

export default function AddTraining({ addTraining }) {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: "",
  });

  const fetchCustomers = () => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((responseData) => setCustomers(responseData.content))
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    fetchCustomers();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleAdd = () => {
    setOpen(false);
    if (!selectedCustomer) {
      alert("Please select a customer.");
      console.log("training", training);
      console.log("selectedCustomer", selectedCustomer);
      
      return;
    }
    if (!training.date) {
      alert("Please select a date.");
      console.log("training", training);
      console.log("selectedCustomer", selectedCustomer);
      
      return;
    }
    setTraining({
      ...training,
      customer: selectedCustomer 
    });
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
      customer: {},
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
    setTraining({ ...training, date });
  };

  React.useEffect(() => {
    console.log("Training state has been updated:", training);
  }, [training]);

  const nameChanged = (event) => {
    const selectedName = event.target.value;
    setSelectedCustomerName(selectedName);

    const selectedCustomer = customers.find((customer) => {
      return `${customer.firstname} ${customer.lastname}` === selectedName;
    });
    setSelectedCustomer(selectedCustomer);
    console.log("2", selectedCustomer)
    setTraining({ ...training, customer: selectedCustomer.links[1].href });

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
            <InputLabel id="customer">Customers</InputLabel>
            <Select
              labelId="select-names"
              id="customer"
              value={selectedCustomerName}
              onChange={nameChanged}
              autoWidth
              label="Customer"
            >
              {customers.map((customer, index) => (
                <MenuItem
                  key={index}
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
