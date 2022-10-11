import React from "react";
import AdminTable from "./AdminTable";
import InviteUser from "./InviteUser";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const AdminPageContent = () => {
  return (
    <Container>
      <Row>
        <h4
          className="mt-5"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Welcome Admin page
        </h4>
      </Row>
      <Row>
        <InviteUser />
      </Row>
      <Row>
        <AdminTable />
      </Row>
    </Container>
  );
};

export default AdminPageContent;
