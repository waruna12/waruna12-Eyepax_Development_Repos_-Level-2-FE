import React from "react";
import ClientTable from "./ClientTable";
import AddClientModel from "./AddClientModel";
import { NotificationContainer } from "react-notifications";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const ClientPageContent = () => {
  return (
    <Container>
      <Row>
        <h4
          className="mt-5"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Welcome Client page
        </h4>
      </Row>
      <Row>
        <AddClientModel />
      </Row>
      <Row>
        <ClientTable />
      </Row>
      <NotificationContainer />
    </Container>
  );
};

export default ClientPageContent;
