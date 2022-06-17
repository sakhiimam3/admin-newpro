import { useState, useEffect, useMemo } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./datatable.scss";
import { userColumns } from "../../datatablesource";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
const Datatable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [realdata, setRealData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [UpdateRowid, setUpdateRowid] = useState(null);



  // set data on page load
  useEffect(() => {
    getRowsLength();
    getRealData(page);
  }, [page]);

  const handleClickOpen = (id) => {
    setUpdateRowid(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setCurrentRow({ ...currentRow, [e.target.name]: e.target.value });
  };







  // update row function
  const handleUpdate = () => {
   
    try {
      axios
        .put(`http://localhost:3000/data/${UpdateRowid}`, currentRow)
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
    let updatedRow = realdata.map((item) =>
      item.id === currentRow.id ? currentRow : item
    );
    setRealData(updatedRow);
    setOpen(false);
  };



  // delete row function
  const handleDelete = (id) => {
    try {
      axios
        .delete(`http://localhost:3000/data/${id}`)
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }

    setRealData(realdata.filter((item) => item.id !== id));
  };




  // add extra columns using concat method below  in this function two buttons  added  view , and delete
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">
                <VisibilityIcon />
              </div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </div>

            <div className="Edit">
              <EditIcon onClick={() => handleClickOpen(params.row.id)} />
            </div>
          </div>
        );
      },
    },
  ];




  // get  totol length of table data
  const getRowsLength = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/data`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };




  // get table data

  const getRealData = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/data?_page=${page + 1}`
      );

      setRealData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>

      {currentRow && (
        <Dialog
          className="dialog"
          open={open}
          PaperProps={{
            style: {
              
              boxShadow: 'none',
               borderRadius:'20px',
               textAlign:'center'
          
            },
          }}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"  variant="h5">  Update Row  </DialogTitle>
          <DialogContent >
            <TextField
              id="standard-basic"
              onChange={handleChange}
              value={currentRow.Name}
              style={{ marginTop: "20px" }}
              fullWidth
              placeholder="Name"
              name="Name"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              onChange={handleChange}
              value={currentRow.Title}
              style={{ marginTop: "20px" }}
              fullWidth
              placeholder="Title"
              name="Title"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              onChange={handleChange}
              value={currentRow.Location}
              style={{ marginTop: "20px" }}
              fullWidth
              placeholder="Location"
              name="Location"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              onChange={handleChange}
              value={currentRow.Age}
              style={{ marginTop: "20px" }}
              fullWidth
              placeholder="Age"
              name="Age"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              onChange={handleChange}
              value={currentRow.Sallary}
              style={{ marginTop: "20px" }}
              fullWidth
              placeholder="Sallary"
              name="Sallary"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              onChange={handleChange}
              value={currentRow.Country}
              style={{ marginTop: "20px" }}
              fullWidth
              placeholder="Country"
              name="Country"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              onChange={handleChange}
              value={currentRow.Gender}
              style={{ marginTop: "20px" }}
              fullWidth
              placeholder="Gender"
              name="Gender"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button style={{ color: "red" }} onClick={handleClose}>
              <CloseIcon /> close
            </Button>
            <Button onClick={handleUpdate} color="success">
              <CheckIcon /> update
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <DataGrid
        className="datagrid"
        rows={realdata}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        paginationMode="server"
        rowsPerPageOptions={[10]}
        
        checkboxSelection
        onPageChange={(page) => setPage(page)}
        rowCount={data.length}
        onRowClick={(row) => setCurrentRow(row.row)}
        components={{
          Toolbar: () => {
            return (
              <GridToolbarContainer sx={{ justifyContent: "flex-end" }}>
                <GridToolbarExport  csvOptions={realdata} />
              </GridToolbarContainer>
            );
          },
        }}
      />
    </div>
  );
};

export default Datatable;
