import React from "react";
import PieChartContent from "./PieChart";
import BarChartContent from "./BarChartContent";
import { NotificationContainer } from "react-notifications";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const StartingPageContent = () => {
  return (
    <Container fluid>
      <Col>
        <Row>
          <h4
            className="mt-5"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Welcome on Board!
          </h4>
        </Row>
        <Row className="mt-3">
          <Col sm={6} style={{ display: "flex", justifyContent: "center" }}>
            <PieChartContent />
          </Col>
          <Col sm={6} style={{ display: "flex", justifyContent: "center" }}>
            <BarChartContent />
          </Col>
        </Row>
      </Col>

      <NotificationContainer />
    </Container>
  );
};

export default StartingPageContent;
