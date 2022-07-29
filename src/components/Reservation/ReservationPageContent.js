import classes from "./ReservationPageContent.module.css";
import ReservationTable from "./ReservationTable";
import AddReservationModel from "./AddReservation";
import { NotificationContainer } from "react-notifications";

const ReservationPageContent = () => {
  return (
    <section className={classes.starting}>
      <h4>Welcome Reservation page</h4>
      <div className={classes.header}>
        <AddReservationModel />
      </div>
      <div className={classes.maincontent}>
        <ReservationTable />
      </div>
      <NotificationContainer />
    </section>
  );
};

export default ReservationPageContent;
