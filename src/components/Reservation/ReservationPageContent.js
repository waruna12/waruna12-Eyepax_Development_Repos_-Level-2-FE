import ReservationTable from "./ReservationTable";
import AddReservationModel from "./AddReservation";
import { NotificationContainer } from "react-notifications";
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
      <NotificationContainer />
    </Container>
  );
};

export default ReservationPageContent;
