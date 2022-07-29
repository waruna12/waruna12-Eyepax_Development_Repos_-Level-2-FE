import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteClient from "./DeleteClient";
import UpdateClient from "./UpdateClient";
import { ClientService } from "./../../services/ClientService";

const ClientTable = (props) => {
  const [row, setRow] = useState([]);

  const newArray = row.map((u) => {
    return {
      ...u,

      id: u._id,
    };
  });

  const [clientId, setClientId] = useState("");
  const [clientFname, setClientFname] = useState("");

  const ClientDetails = async () => {
    try {
      const result = await ClientService.clientDetails();

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

  // if (props.newClient == true) {
  //   ClientDetails();
  // }

  useEffect(() => {
    ClientDetails();
  }, [props.newClient]);

  const onClick = () => {
    ClientDetails();
  };

  const columns = [
    { field: "fname", headerName: "First Name", width: 150 },
    { field: "lname", headerName: "Last Name", width: 150 },
    { field: "phone_number", headerName: "Phone Number", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "Edit",
      headerName: "Edit",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            onClick={() => {
              setClientId(params.row.id);
            }}
          >
            {/* <FontAwesomeIcon icon={faPen} /> */}
            <UpdateClient clientId={clientId} />
            {/* onClick={onClick} */}
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
          <div
            onClick={() => {
              setClientId(params.row.id);
            }}
          >
            <DeleteClient clientId={clientId} onClick={onClick} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div
        style={{
          height: 300,
          width: "80%",
        }}
      >
        <DataGrid rows={newArray} columns={columns} />
      </div>
    </>
  );
};

export default ClientTable;
