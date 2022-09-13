import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
// import classes from "./Slide.module.css";
import "./Slide.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import clients from "./../../images/clients.jpg";
import resavation from "./../../images//resavation.jpg";
import calender from "./../../images/calander.jpg";

function Slide() {
  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col sm>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={clients} />
            <Card.Body>
              <Card.Title>Clients</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, conse adipiscing elit, sed do
                eiusmod tempor incididunt ut.
              </Card.Text>
              <Link
                to={{
                  pathname: `/${"Clients_Section"}`,
                  state: { stateParam: true },
                }}
              >
                <Button variant="primary">Clients</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col sm>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={resavation} />
            <Card.Body>
              <Card.Title>Reservations</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, conse adipiscing elit, sed do
                eiusmod tempor incididunt ut.
              </Card.Text>
              <Link
                to={{
                  pathname: `/${"Reservations_Section"}`,
                  state: { stateParam: true },
                }}
              >
                <Button variant="primary">Reservations</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col sm>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={calender} />
            <Card.Body>
              <Card.Title>Calendar</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, conse adipiscing elit, sed do
                eiusmod tempor incididunt ut.
              </Card.Text>
              <Link
                to={{
                  pathname: `/${"Calendar_Section"}`,
                  state: { stateParam: true },
                }}
              >
                <Button variant="primary">Calendar</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Slide;
