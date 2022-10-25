import ReservationTable from "./ReservationTable";
import AddReservationModel from "./AddReservation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const ReservationPageContent = (props) => {
  return (
    <Container>
      <Row>
        <h4
          className="mt-5"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Welcome Reservation page
        </h4>
      </Row>
      <Row>
        <AddReservationModel />
      </Row>
      <Row>
        <ReservationTable />
      </Row>
    </Container>
  );
};

export default ReservationPageContent;
