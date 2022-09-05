import classes from "./ReservationPageContent.module.css";
import ReservationTable from "./ReservationTable";
import AddReservationModel from "./AddReservation";
import { NotificationContainer } from "react-notifications";
import { useState } from "react";

const ReservationPageContent = (props) => {
  const [addreservation, setAddReservation] = useState(false);

  return (
    <section className={classes.starting}>
      <h4>Welcome Reservation page</h4>
      <div className={classes.header}>
        <AddReservationModel onSaveAddReservation={setAddReservation} />
      </div>
      <div className={classes.maincontent}>
        <ReservationTable
          onAddReservation={addreservation}
          addClientStateChange={setAddReservation}
        />
      </div>
      <NotificationContainer />
    </section>
  );
};

export default ReservationPageContent;
