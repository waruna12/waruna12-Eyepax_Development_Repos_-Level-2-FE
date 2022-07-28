import classes from "./ReservationPageContent.module.css";
import ReservationTable from "./ReservationTable";
import AddReservationModel from "./AddReservation";

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
    </section>
  );
};

export default ReservationPageContent;
