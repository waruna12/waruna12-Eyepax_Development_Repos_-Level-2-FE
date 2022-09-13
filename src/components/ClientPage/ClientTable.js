import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteClient from "./DeleteClient";
import UpdateClient from "./UpdateClient";
import { ClientService } from "./../../services/ClientService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { ClientContext } from "./../../store/client-context";

const ClientTable = () => {
  const [clients, setClients] = useContext(ClientContext);
  const [clientUpdate, setClientUpdate] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const newArray = clients.map((u) => {
    return {
      ...u,

      id: u._id,
    };
  });

  const ClientDetails = async () => {
    try {
      const result = await ClientService.clientDetails();
      setClients(result);
    } catch (err) {}
  };

  const onClick = () => {
    ClientDetails();
  };

  useEffect(() => {
    ClientDetails();
  }, [clientUpdate]);

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
            <UpdateClient
              clientId={clientId}
              onUpdateClientData={setClientUpdate}
            />
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
              setClientEmail(params.row.email);
            }}
          >
            <DeleteClient
              clientId={clientId}
              clientEmail={clientEmail}
              onClick={onClick}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Row style={{ height: "50vh", width: "100%", marginTop: "2vh" }}>
        <DataGrid rows={newArray} columns={columns} />
      </Row>
    </Container>
  );
};

export default ClientTable;
