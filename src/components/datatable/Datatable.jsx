import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Mockdata from "../../MOCK_DATA.json";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

 
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];


    // set data on page load 
  useEffect(() => {
    setData(Mockdata);
  }, [page]);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        onPageChange={(page) => setPage(page)}
        
      />
    </div>
  );
};

export default Datatable;
