import React, { useState } from "react";
import moment from 'moment';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddTraining from './AddTraining';
import EditTraining from './EditTraining';

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const gridRef = React.useRef();
  const [msg, setMsg] = useState('');
  const [open, setOpen] = useState(false);

  const addTraining = (training) => {
    console.log("painike");
    
    fetch("https://traineeapp.azurewebsites.net/api/trainings", {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(training)
    })

    .then(response => {
      if(response.ok) {
        fetchTrainings();
      }
    })
  };

  const editTraining = (training, link) => {
    
    
    fetch(link, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(training)
    })
      .then(response => {
        if (response.ok) {
          setMsg('Training edited successfully');
          setOpen(true);
          fetchTrainings();
        } else {
          alert("Something went wrong :'( ");
        }
      })
      .catch(err => console.error(err));
  };

const deleteTraining = (link) => { 
  console.log(link)
if(window.confirm('Are you sure?')) {
  fetch(link, { method: 'DELETE'})
.then(response => {
  if(response.ok) {
    setMsg('Training deleted');
      setOpen(true);
      fetchTrainings();
  } else{
    alert("Something went wrong");
  }
})
.catch(err => console.log("err"))
}}
  




  const fetchTrainings = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((responseData) => setTrainings(responseData))
      .catch((err) => console.error(err));
  }
  
  React.useEffect(() => {
    fetchTrainings()
  }, []);

  const columns = [
    {
      field: "date",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
      cellRenderer: (params) => {
        const formattedDate = moment.utc(params.value).format('DD.MM.YYYY HH:mm');
        return formattedDate;
      },
    },
    
    {
      field: "duration",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
    },
    {
      field: "activity",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
    },
    {
      headerName: "Customer",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
      valueGetter: (params) => `${params.data.customer.firstname} ${params.data.customer.lastname}`,
    },
    {
      headerName: "",
      width: 200,
      field: "id",
      cellRenderer: (params) => {
        return (
          <EditTraining editTraining={editTraining} params={params}/>
        );
      },
    },
  {
    headerName: "",
    width: 200,
    field: "id",
    cellRenderer: (params) => {
      return (
        <Button onClick={() => deleteTraining(params.value)} color="error">
          <DeleteIcon />
        </Button>
      );
    },
  },
    
  ];

  return (
    <div>
      <Stack spacing={2} direction="row">
        <AddTraining addTraining={addTraining} />
        
      </Stack>
      
      <div
        className="ag-theme-material"
        style={{ height: "700px", width: "100%", margin: "auto" }}
      >
      <AgGridReact
        rowData={trainings}
        ref={gridRef}
        rowSelection="single"
        onGridReady={(params) => (gridRef.current = params.api)}
        columnDefs={columns}
        pagination={true}
      ></AgGridReact>
      </div>
    </div>
  );
}
