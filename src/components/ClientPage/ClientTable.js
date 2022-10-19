import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteClient from "./DeleteClient";
import UpdateClient from "./UpdateClient";
import { ClientService } from "./../../services/ClientService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ClientContext from "./../../store/client-context";

const ClientTable = () => {
  const clientCtx = useContext(ClientContext);

  const [page, setPage] = useState(0);

  const [sortModel, setSortModel] = useState([
    {
      field: "createdAt",
      sort: "asc",
    },
  ]);

  const [clientId, setClientId] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const updateClientRow = clientCtx.clients?.map((updateValue) => {
    return {
      ...updateValue,
      id: updateValue._id,
    };
  });

  const ClientDetails = async () => {
    try {
      const result = await ClientService.clientDetails(page, sortModel);

      clientCtx.getAllClientDetails(result, page);
    } catch (err) {
      return err;
    }
  };

  const onClick = () => {
    ClientDetails();
  };

  useEffect(() => {
    ClientDetails();
  }, [page, sortModel]);

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
            <UpdateClient clientId={clientId} />
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

  const columns1 = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows1 = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Row style={{ width: "100%", marginTop: "2vh" }}>
        <DataGrid
          rows={updateClientRow}
          columns={columns}
          autoHeight
          pagination
          paginationMode="server"
          pageSize={5}
          // rowsPerPageOptions={[2]}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
          rowCount={clientCtx.allClientsCount}
          onSortModelChange={(newSortModel) => {
            setSortModel(newSortModel);
          }}
        />
      </Row>
    </Container>
  );
};

export default ClientTable;
