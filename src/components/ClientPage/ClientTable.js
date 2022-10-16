import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteClient from "./DeleteClient";
import UpdateClient from "./UpdateClient";
import { ClientService } from "./../../services/ClientService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { ClientContext } from "./../../store/client-context";

const ClientTable = () => {
  const [page, setPage] = useState(0);

  const [sortModel, setSortModel] = useState([
    {
      field: "fname",
      sort: "desc",
    },
  ]);

  const [clients, setClients] = useContext(ClientContext);
  const [clientUpdate, setClientUpdate] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const updateClientRow = clients.map((updateValue) => {
    return {
      ...updateValue,
      id: updateValue._id,
    };
  });

  const ClientDetails = async () => {
    try {
      const result = await ClientService.clientDetails();
      setClients(result);
    } catch (err) {
      return err;
    }
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
      flex: 2,
    },
    { field: "lname", headerName: "Last Name", flex: 2 },
    { field: "phone_number", headerName: "Phone Number", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    {
      field: "Action",
      headerName: "Action",
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
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <UpdateClient
              clientId={clientId}
              onUpdateClientData={setClientUpdate}
            />
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
        {/* <DataGrid
          rows={updateClientRow}
          columns={columns}
          autoHeight
          pagination
          paginationMode="server"
          pageSize={3}
          rowsPerPageOptions={[10]}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
          rowCount={100}
        /> */}

        <DataGrid
          rows={updateClientRow}
          columns={columns}
          autoHeight
          pagination
          pageSize={5}
          rowsPerPageOptions={[5]}
          onSortModelChange={(newSortModel) => {
            setSortModel(newSortModel);
          }}
        />
      </Row>
    </Container>
  );
};

export default ClientTable;
