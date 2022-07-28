import classes from "./CalenderContent.module.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { event } from "./../../data";

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
  return (
    <section className={classes.starting}>
      <h4>Welcome on Calendar</h4>
      <div className={classes.maincontent}>
        <Calendar
          localizer={localizer}
          events={event}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </section>
  );
};

export default CalenderContent;
