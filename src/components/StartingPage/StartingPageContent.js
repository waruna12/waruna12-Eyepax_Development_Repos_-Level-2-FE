import React from "react";
import PieChartContent from "./PieChart";
import BarChartContent from "./BarChartContent";
import InviteNewUser from "./InviteNewUser";
import { NotificationContainer } from "react-notifications";
import Slide from "./Slide";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const StartingPageContent = () => {
  return (
    <Container>
      <Row>
        <h4
          className="mt-3"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Welcome on Board!
        </h4>
      </Row>
      <Row>
        <InviteNewUser />
      </Row>
      <Row>
        <Col sm={6} style={{ display: "flex", justifyContent: "center" }}>
          <PieChartContent />
        </Col>
        <Col sm={6} style={{ display: "flex", justifyContent: "center" }}>
          <BarChartContent />
        </Col>
      </Row>
      <Row>
        <Slide />
      </Row>
      <NotificationContainer />
    </Container>
  );
};

export default StartingPageContent;
