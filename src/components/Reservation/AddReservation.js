import React, { useRef, useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./AddReservation.module.css";
import { service_type, timeArray } from "./../../data";
import { ReservationService } from "./../../services/ReservationService";
import { ClientService } from "./../../services/ClientService";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ReservationContext } from "./../../store/reservation-context";
import moment from "moment";

const AddReservationModel = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 0);

  const formatOne = "YYYY-MM-DD";

  const [reservation, setReservationContext] = useContext(ReservationContext);

  const [clients, setClients] = useState([]);

  const [onChangeDate, setChangeDate] = useState("");
  const [onChangeTime, setChangeTime] = useState("");

  const [availablestylist, setAvailableStylist] = useState([]);

  const [reservationsearchvalue, setReservationSearchValue] = useState("");
  let replaceSearchValue = reservationsearchvalue.replace(/\s+/g, "");

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

      ReservationDetails();
      NotificationManager.success(
        "Reservation success added",
        "Success",
        "Close after 15000ms",
        10000000000
      );
      handleClose();
      return response;
    } catch (err) {
      NotificationManager.error(
        "Reservation cannot be duplicate",
        "error",
        "Close after 15000ms",
        10000000000
      );
    }
  };

  const ClientDetails = async () => {
    try {
      const result = await ClientService.clientDetails();

      setClients(result);
    } catch (err) {}
  };

  const AvailableStylsitDetails = async () => {
    try {
      const result = await ReservationService.reservationStylistSearch(
        onChangeDate,
        onChangeTime
      );

      setAvailableStylist(result);
    } catch (err) {}
  };

  useEffect(() => {
    if (onChangeDate && onChangeTime) {
      AvailableStylsitDetails();
    }
  }, [onChangeDate, onChangeTime]);

  const ReservationDetailSearch = async () => {
    try {
      const result = await ReservationService.reservationSearch(
        replaceSearchValue
      );

      setReservationContext(result);
    } catch (err) {}
  };

  const ReservationDetails = async () => {
    try {
      const result = await ReservationService.reservationDetails();

      setReservationContext(result);
    } catch (err) {}
  };

  useEffect(() => {
    if (replaceSearchValue.length > 0) {
      ReservationDetailSearch();
    }
  }, [replaceSearchValue]);

  useEffect(() => {
    ClientDetails();
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col sm={4}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search here"
              aria-label="Search here"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                setReservationSearchValue(e.target.value);

                if (e.target.value === "") {
                  ReservationDetails();
                }
              }}
            />
          </InputGroup>
        </Col>
        <Col sm={8} style={{ display: "flex", justifyContent: "end" }}>
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
                          return (
                            <option key={cli.id} value={cli.email}>
                              {cli.email}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className={classes.control}>
                      <label htmlFor="password">Service Type</label>
                      <select
                        name="serviceType"
                        required
                        ref={serviceTypeInputRef}
                      >
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
                      <label htmlFor="date">Select Date</label>
                      <input
                        type="date"
                        min={moment(currentDate).format(formatOne)}
                        max="2024-09-09"
                        id="password"
                        required
                        ref={reservationDateInputRef}
                        onChange={(e) => {
                          setChangeDate(e.target.value);
                        }}
                      />
                    </div>
                    <div className={classes.control}>
                      <label htmlFor="password">Select Time</label>
                      <select
                        name="time"
                        required
                        ref={reservationTimeInputRef}
                        onChange={(e) => {
                          setChangeTime(e.target.value);
                        }}
                      >
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
                    <div className={classes.control}>
                      <label htmlFor="password">Stylist</label>
                      <select name="stylist" required ref={stylistInputRef}>
                        <option value="">Select Stylist</option>
                        {availablestylist.map((x) => {
                          return (
                            <option key={x} value={x}>
                              {x}
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
        </Col>
      </Row>
    </Container>
  );
};

export default AddReservationModel;
