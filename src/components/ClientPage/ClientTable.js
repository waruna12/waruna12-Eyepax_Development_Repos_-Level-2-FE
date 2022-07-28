import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
// import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteClient from "./DeleteClient";
import UpdateClient from "./UpdateClient";
import { ClientService } from "./../../services/ClientService";

const rows = [
  {
    id: "62e107ce84956113e84fbb8e",
    First_Name: "Waruna",
    Last_Name: "Kulathuga",
    Phone_Number: "0779044891",
    Email: "waruna532@gmail.com",
  },
  {
    id: "72e107ce84956113e84fbb8e",
    First_Name: "kamak",
    Last_Name: "Kulathuga",
    Phone_Number: "0779044891",
    Email: "waruna532@gmail.com",
  },
  // {
  //   id: 3,
  //   First_Name: "Ishara",
  //   Last_Name: "Kulathuga",
  //   Phone_Number: "0779044891",
  //   Email: "waruna532@gmail.com",
  // },
];

const columns = [
  { field: "First_Name", headerName: "First Name", width: 150 },
  { field: "Last_Name", headerName: "Last Name", width: 150 },
  { field: "Phone_Number", headerName: "Phone Number", width: 150 },
  { field: "Email", headerName: "Email", width: 200 },
  {
    field: "Edit",
    headerName: "Edit",
    width: 150,
    sortable: false,
    renderCell: (params) => {
      return (
        <div>
          {/* <FontAwesomeIcon icon={faPen} /> */}
          <UpdateClient />
        </div>
      );
    },
  },
  {
    field: "Delete",
    headerName: "Delete",
    width: 150,
    sortable: false,
    renderCell: (params) => {
      return (
        <div>
          {/* <FontAwesomeIcon icon={faTrash} /> */}
          <DeleteClient />
        </div>
      );
    },
  },
];

const ClientTable = () => {
  const [row, setRow] = useState([]);

  const ClientDetails = async () => {
    try {
      const result = await ClientService.clientDetails();

      console.log(result);
      setRow(result);
    } catch (err) {
      //toast
      // if (err.response.data.message !== undefined) {
      //   notifyWarning(err.response.data.message);
      // } else {
      //   notifyWarning("Somthing Wrong");
      // }
    }
  };

  useEffect(() => {
    ClientDetails();
  }, []);

  return (
    <>
      <div
        style={{
          height: 300,
          width: "80%",
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
};

export default ClientTable;
