import React, { useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { UserService } from "./../../services/UserService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { UserContext } from "./../../store/user-context";

const AdminTable = () => {
  const [useres, setUsers] = useContext(UserContext);

  const newArrayRow = useres.map((u) => {
    return {
      ...u,
      id: u._id,
    };
  });

  const userDetails = async () => {
    try {
      const result = await UserService.userDetails();
      setUsers(result);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    userDetails();
  }, []);

  const columns = [
    {
      field: "fname",
      headerName: "First Name",
      flex: 2,
    },
    { field: "lname", headerName: "Last Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
  ];

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Row style={{ width: "100%", marginTop: "2vh" }}>
        <DataGrid
          rows={newArrayRow}
          columns={columns}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Row>
    </Container>
  );
};

export default AdminTable;
