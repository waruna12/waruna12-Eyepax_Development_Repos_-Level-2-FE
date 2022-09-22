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

  const newArrayRow = clients.map((u) => {
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
    {
      field: "fname",
      headerName: "First Name",
      flex: 1,
    },
    { field: "lname", headerName: "Last Name", flex: 1 },
    { field: "phone_number", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "Edit",
      headerName: "Edit",
      flex: 1,
      sortable: false,
      hideable: false,
      renderCell: (params) => {
        return (
          <div
            onClick={() => {
              setClientId(params.row.id);
              setClientEmail(params.row.email);
            }}
          >
            <UpdateClient
              clientId={clientId}
              onUpdateClientData={setClientUpdate}
              clientEmail={clientEmail}
            />
          </div>
        );
      },
    },
    {
      field: "Delete",
      headerName: "Delete",
      flex: 1,
      sortable: false,
      hideable: false,
      disableColumnSelector: true,
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
      <Row style={{ width: "100%", marginTop: "2vh" }}>
        <DataGrid
          rows={newArrayRow}
          columns={columns}
          autoHeight
          hideFooter
          disableColumnMenu
        />
      </Row>
    </Container>
  );
};

export default ClientTable;
