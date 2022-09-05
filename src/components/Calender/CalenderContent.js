import React, { useEffect, useState } from "react";
import classes from "./CalenderContent.module.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { event } from "./../../data";
import { ReservationService } from "./../../services/ReservationService";

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

const CalenderContent = () => {
  const [reservation_details, setReservation] = useState([]);

  const ReservationDetails = async () => {
    try {
      const result = await ReservationService.reservationDetails();

      setReservation(result);
    } catch (err) {
      //toast
      // if (err.response.data.message !== undefined) {
      //   notifyWarning(err.response.data.message);
      // } else {
      //   notifyWarning("Somthing Wrong");
      // }
    }
  };

  useEffect(() => {
    ReservationDetails();
    console.log(event);
  }, []);

  const newArray = reservation_details.map((u) => {
    return {
      ...u,
      id: u._id,
      title: u.service_type,
      start: new Date(u.reservation_date),
      end: new Date(u.reservation_date),
    };
  });

  return (
    <section className={classes.starting}>
      <h4>Welcome on Calendar</h4>
      <div className={classes.maincontent}>
        <Calendar
          localizer={localizer}
          events={newArray}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </section>
  );
};

export default CalenderContent;
