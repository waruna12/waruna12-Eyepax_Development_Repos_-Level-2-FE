import React, { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./AddReservation.module.css";
import { service_type, timeArray } from "./../../data";
import { ReservationService } from "./../../services/ReservationService";
import { ClientService } from "./../../services/ClientService";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { UserService } from "./../../services/UserService";

const AddReservationModel = (props) => {
  const [clients, setClients] = useState([]);

  const [users, setUser] = useState([]);

  const stylist = [
    { id: "1", name: "Ron Jesen" },
    { id: "2", name: "Zamir Ahmed" },
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clientInputRef = useRef();
  const serviceTypeInputRef = useRef();
  const stylistInputRef = useRef();
  const reservationDateInputRef = useRef();
  const reservationTimeInputRef = useRef();

  const onSubmitForm = async (event) => {
    event.preventDefault();

    const enteredClient = clientInputRef.current.value;
    const enteredService = serviceTypeInputRef.current.value;
    const enteredStylist = stylistInputRef.current.value;
    const enteredDate = reservationDateInputRef.current.value;
    const enteredTime = reservationTimeInputRef.current.value;

    try {
      const response = await ReservationService.reservationCreate(
        enteredClient,
        enteredService,
        enteredStylist,
        enteredDate,
        enteredTime
      );

      props.onSaveAddReservation(true);
      NotificationManager.success("Reservation Success Added", "Success");
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const ClientDetails = async () => {
    try {
      const result = await ClientService.clientDetails();

      setClients(result);
    } catch (err) {}
  };

  const UserDetails = async () => {
    try {
      const result = await UserService.userDetails();

      setUser(result);
    } catch (err) {}
  };

  useEffect(() => {
    ClientDetails();
    UserDetails();
  }, []);

  return (
    <div>
      <button onClick={handleOpen} className={classes.button}>
        Add New
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.auth}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Add New Reservation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <section>
              <form onSubmit={onSubmitForm}>
                <div className={classes.control}>
                  <label htmlFor="email">Client</label>
                  <select name="client" required ref={clientInputRef}>
                    <option value="">Select Client </option>
                    {clients.map((cli, index) => {
                      console.log(cli.id);
                      return (
                        <option key={cli.id} value={cli.fname}>
                          {cli.fname} {cli.lname}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Service Type</label>
                  <select name="serviceType" required ref={serviceTypeInputRef}>
                    <option value="">Select Service Type</option>
                    {service_type.map((service, index) => {
                      return (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Stylist</label>
                  <select name="stylist" required ref={stylistInputRef}>
                    <option value="">Select Stylist</option>
                    {users.map((sty, index) => {
                      return (
                        <option key={sty._id} value={sty.fname}>
                          {sty.fname} {sty.lname}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="date">Select Date</label>
                  <input
                    // type="date"
                    type="datetime-local"
                    id="password"
                    required
                    ref={reservationDateInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Select Time</label>
                  <select name="time" required ref={reservationTimeInputRef}>
                    <option value="">Select Time</option>
                    {timeArray.map((time, index) => {
                      return (
                        <option key={time.id} value={time.time}>
                          {time.time}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className={classes.actions}>
                  <button>Reservation</button>
                </div>
              </form>
            </section>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default AddReservationModel;
