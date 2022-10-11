import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import React, { useEffect, useState, useContext } from "react";
import classes from "./CalenderContent.module.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import min from "date-fns/min";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ReservationService } from "./../../services/ReservationService";
import { ReservationContext } from "./../../store/reservation-context";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import moment from "moment";
import { DATE_FORMAT, CURRENT_DATE } from "./../../config/constants";

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
  min,
});

const CalenderDragDrop = () => {
  const [setReservationContext] = useContext(ReservationContext);
  const [reservationDetails, setReservationDetails] = useState([]);

  const [reservation, setReservationBoolean] = useState(false);

  const ReservationDetails = async () => {
    try {
      const result = await ReservationService.reservationDetails();

      setReservationDetails(result);
      setReservationContext(result);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    ReservationDetails();
    setReservationBoolean(false);
  }, [reservation]);

  const DnDCalendarFormatData = reservationDetails.map((reservation) => {
    return {
      ...reservation,
      id: reservation._id,
      title:
        reservation.service_type +
        " : " +
        reservation.reservation_time +
        " : " +
        reservation.stylist_email,
      start: new Date(reservation.reservation_date),
      end: new Date(reservation.reservation_date),
    };
  });

  const moveEvent = ({
    event,
    start,
    // end,
    isAllDay: droppedOnAllDaySlot = false,
  }) => {
    if (start >= CURRENT_DATE) {
      onSubmitForm(
        event.id,
        moment(start).format(DATE_FORMAT),
        event.reservation_time,
        event.stylist_email,
        event.client_email,
        event.service_type,
        event.reservation_status
      );
    } else {
      NotificationManager.error("Cannot update to a previous date.", "error");
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
      setReservationBoolean(true);
      ReservationDetails();
    } catch (err) {
      return err;
    }
  };

  return (
    <Container className={classes.starting}>
      <Row>
        <div className={classes.maincontent}>
          <DnDCalendar
            localizer={localizer}
            events={DnDCalendarFormatData}
            draggableAccessor={(event) => true}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "75vh" }}
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
