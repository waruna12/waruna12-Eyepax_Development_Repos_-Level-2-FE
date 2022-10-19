import React, { useRef, useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./AddReservation.module.css";
import { service_type, timeArray } from "./../../data";
import { ReservationService } from "./../../services/ReservationService";
import { ClientService } from "./../../services/ClientService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ReservationContext } from "./../../store/reservation-context";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { DATE_FORMAT, TIME_FORMAT } from "./../../config/constants";

const AddReservationModel = () => {
  const currentDate = new Date();

  const currentTime = moment(currentDate).format(TIME_FORMAT);
  currentDate.setDate(currentDate.getDate() - 0);

  const [reservation, setReservationContext] = useContext(ReservationContext);

  const [clients, setClients] = useState([]);
  const [onChangeDate, setChangeDate] = useState("");
  const [onChangeTime, setChangeTime] = useState("");
  const [availableStylist, setAvailableStylist] = useState([]);
  const [reservationSearchValue, setReservationSearchValue] = useState("");

  let replaceSearchValue = reservationSearchValue.replace(/\s+/g, "");

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
      handleClose();
      return response;
    } catch (err) {
      return err;
    }
  };

  const sortModel = [
    {
      field: "createdAt",
      sort: "asc",
    },
  ];

  const ClientDetails = async () => {
    try {
      const result = await ClientService.clientDetails(0, sortModel);
      setClients(result.data);
    } catch (err) {
      return err;
    }
  };

  const AvailableStylsitDetails = async () => {
    try {
      const result = await ReservationService.reservationStylistSearch(
        onChangeDate,
        onChangeTime
      );
      setAvailableStylist(result);
    } catch (err) {
      return err;
    }
  };

  const ReservationDetailSearch = async () => {
    try {
      const result = await ReservationService.reservationSearch(
        replaceSearchValue
      );
      setReservationContext(result);
    } catch (err) {
      return err;
    }
  };

  const ReservationDetails = async () => {
    try {
      const result = await ReservationService.reservationDetails();
      setReservationContext(result);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (onChangeDate && onChangeTime) {
      AvailableStylsitDetails();
    }
  }, [onChangeDate, onChangeTime]);

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
                        {clients.map((client, index) => {
                          return (
                            <option key={index} value={client.email}>
                              {client.fname}
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
                            <option key={index} value={service.title}>
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
                        min={moment(currentDate).format(DATE_FORMAT)}
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
                        {timeArray.map((timeData, index) => {
                          return (
                            <option
                              key={index}
                              value={timeData.time}
                              disabled={
                                parseInt(timeData.time) <
                                  parseInt(currentTime) &&
                                moment(currentDate).format(DATE_FORMAT) ===
                                  onChangeDate
                              }
                            >
                              {timeData.time}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* <div className={classes.control}>
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
                        {timeArray.map((timeData, index) => {
                          // currentDate === new Date(onChangeDate)
                          return (
                            <option
                              key={index}
                              value={timeData.time}
                              disabled={
                                parseInt(timeData.time) < parseInt(currentTime)
                              }
                            >
                              {timeData.time}
                            </option>
                          );
                        })}
                      </select>
                    </div> */}
                    <div className={classes.control}>
                      <label htmlFor="password">Stylist</label>
                      <select name="stylist" required ref={stylistInputRef}>
                        <option value="">Select Stylist</option>
                        {availableStylist.map((stylist, index) => {
                          return (
                            <option key={index} value={stylist}>
                              {stylist}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "5vh",
                      }}
                    >
                      <Button type="submit" variant="light">
                        Add Reservation
                      </Button>
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
