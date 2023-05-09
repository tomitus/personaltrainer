import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const gridRef = React.useRef();
  const [msg, setMsg] = useState('');
  const [open, setOpen] = useState(false);

  const addCustomer = (customer) => {
    console.log("painike");
    
    fetch("https://traineeapp.azurewebsites.net/api/customers", {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(customer)
    })

    .then(response => {
      if(response.ok) {
        fetchCustomers();
      }
    })
  };

  const editCustomer = (customer, customerUrl) => {
    customerUrl = customerUrl.find(link => link.rel === 'customer').href;
    console.log(customerUrl);
    fetch(customerUrl, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(customer)
    })
      .then(response => {
        if (response.ok) {
          setMsg('Customer edited successfully');
          setOpen(true);
          fetchCustomers();
        } else {
          alert("Something went wrong :'( ");
        }
      })
      .catch(err => console.error(err));
  };

const deleteCustomer = (link) => { 
  console.log(link)
if(window.confirm('Are you sure?')) {
  fetch(link, { method: 'DELETE'})
.then(response => {
  if(response.ok) {
    setMsg('Customer deleted');
      setOpen(true);
      fetchCustomers();
  } else{
    alert("Something went wrong");
  }
})
.catch(err => console.log("err"))
}}
  




  const fetchCustomers = () => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((responseData) => setCustomers(responseData.content))
      .catch((err) => console.error(err));
  }
  
  React.useEffect(() => {
    fetchCustomers()
  }, []);

  const columns = [
    {
      field: "firstname",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
    },
    {
      field: "lastname",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
    },
    {
      headerName: "Street address",
      field: "streetaddress",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
    },
    {
      field: "postcode",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
    },
    {
      field: "city",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
    },
    {
      field: "email",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
    },
    {
      field: "phone",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
    },
    {
      headerName: "",
      width: 200,
      field: "links",
      cellRenderer: (params) => {
        const customerLink = params.value.find(link => link.rel === "customer");
        const customerUrl = customerLink ? customerLink.href : null;
        return (
          <EditCustomer editCustomer={editCustomer} params={params} customerUrl={customerUrl}/>
        );
      },
    },
  {
    headerName: "",
    width: 200,
    field: "links",
    cellRenderer: (params) => {
      const customerLink = params.value.find(link => link.rel === "customer");
      const customerUrl = customerLink ? customerLink.href : null;
      return (
        <Button onClick={() => deleteCustomer(customerUrl)} color="error">
          <DeleteIcon />
        </Button>
      );
    },
  },
    
  ];

  return (
    <div>
      <Stack spacing={2} direction="row">
        <AddCustomer addCustomer={addCustomer} />
        
      </Stack>
      
      <div
        className="ag-theme-material"
        style={{ height: "700px", width: "100%", margin: "auto" }}
      >
      <AgGridReact
        rowData={customers}
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
