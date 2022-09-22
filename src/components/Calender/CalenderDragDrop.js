import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import React, { useEffect, useState, useContext } from "react";
import classes from "./CalenderContent.module.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ReservationService } from "./../../services/ReservationService";
import { ReservationContext } from "./../../store/reservation-context";
import { NotificationManager } from "react-notifications";
import { NotificationContainer } from "react-notifications";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import moment from "moment";

const DnDCalendar = withDragAndDrop(Calendar);

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalenderDragDrop = () => {
  const customFormat = "YYYY-MM-DD";

  var today = new Date();

  const [setReservationContext] = useContext(ReservationContext);
  const [reservation_details, setReservation] = useState([]);

  const [test, setTest] = useState(false);

  const ReservationDetails = async () => {
    try {
      const result = await ReservationService.reservationDetails();

      setReservation(result);
      setReservationContext(result);
    } catch (err) {}
  };

  useEffect(() => {
    ReservationDetails();
    setTest(false);
  }, [test]);

  const newArray = reservation_details.map((u) => {
    return {
      ...u,
      id: u._id,
      title: u.service_type,
      start: new Date(u.reservation_date),
      end: new Date(u.reservation_date),
    };
  });

  const moveEvent = ({
    event,
    start,
    // end,
    isAllDay: droppedOnAllDaySlot = false,
  }) => {
    if (start >= today) {
      onSubmitForm(
        event.id,
        moment(start).format(customFormat),
        event.reservation_time,
        event.stylist_email,
        event.client_email,
        event.service_type,
        event.reservation_status
      );
    } else {
      NotificationManager.error(
        "The date is too old",
        "error",
        "Close after 45000ms",
        45000
      );
    }
  };

  const onSubmitForm = async (
    id,
    start,
    reservation_time,
    stylist_email,
    client_email,
    service_type,
    reservation_status
  ) => {
    try {
      await ReservationService.dragReservationUpdate(
        id,
        start,
        reservation_time,
        stylist_email,
        client_email,
        service_type,
        reservation_status
      );

      setTest(true);
      ReservationDetails();
      NotificationManager.success(
        "Reservation Success Update",
        "Success",
        "Close after 15000ms",
        50000
      );
    } catch (err) {
      NotificationManager.error(
        "There is no available date.",
        "error",
        "Close after 45000ms",
        45000
      );
    }
  };

  return (
    <Container className={classes.starting}>
      <Row>
        <h4 className="mb-3">Welcome on Calendar</h4>
      </Row>
      <Row>
        <div className={classes.maincontent}>
          <DnDCalendar
            localizer={localizer}
            events={newArray}
            draggableAccessor={(event) => true}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            resizable={false}
            onEventDrop={moveEvent}
          />
        </div>
      </Row>
      <NotificationContainer />
    </Container>
  );
};

export default CalenderDragDrop;
