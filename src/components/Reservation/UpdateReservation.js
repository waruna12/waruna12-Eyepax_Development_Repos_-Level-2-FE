import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./UpdateReservation.module.css";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { service_type, timeArray, status } from "./../../data";
import { ReservationService } from "./../../services/ReservationService";
import { Formik } from "formik";
import { ClientService } from "./../../services/ClientService";
import Container from "react-bootstrap/Container";
import { ReservationContext } from "./../../store/reservation-context";
import Button from "react-bootstrap/Button";
import moment from "moment";
import {
  DATE_FORMAT,
  TIME_FORMAT,
  CURRENT_DATE,
} from "./../../config/constants";

const UpdateReservation = (props) => {
  CURRENT_DATE.setDate(CURRENT_DATE.getDate() - 0);
  const currentTime = moment(CURRENT_DATE).format(TIME_FORMAT);

  const [onChangeDate, setChangeDate] = useState("");
  const [onChangeTime, setChangeTime] = useState("");
  const [availablestylist, setAvailableStylist] = useState([]);

  const [setReservationContext] = useContext(ReservationContext);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    ReservationDetailSearchID();
  };

  const handleClose = () => {
    setOpen(false);
    ReservationDetailSearchID();
    ReservationDetails();
  };

  const [clients, setClients] = useState([]);

  const [reservationInfo, setReservationInfo] = useState({
    client_email: "",
    service_type: "",
    stylist_email: "",
    reservation_date: "",
    reservation_time: "",
    reservation_status: "",
  });

  const ReservationDetailSearchID = async () => {
    try {
      const result = await ReservationService.reservationDetailsID(
        props.reservationId
      );

      const info = {};
      const reservationInfo = result;

      info.client_email = reservationInfo.client_email;
      info.service_type = reservationInfo.service_type;
      info.stylist_email = reservationInfo.stylist_email;
      info.reservation_date = reservationInfo.reservation_date;
      info.reservation_time = reservationInfo.reservation_time;
      info.reservation_status = reservationInfo.reservation_status;

      setChangeDate(reservationInfo.reservation_date);
      setChangeTime(reservationInfo.reservation_time);
      setReservationInfo(info);
    } catch (err) {
      return err;
    }
  };

  const ClientDetails = async () => {
    try {
      const result = await ClientService.clientDetails();

      setClients(result);
    } catch (err) {
      return err;
    }
  };

  const onSubmitForm = (values) => {
    try {
      ReservationService.reservationUpdate(
        props.reservationId,
        values.client_email,
        values.service_type,
        values.stylist_email,
        onChangeDate,
        onChangeTime,
        values.reservation_status
      );

      ReservationDetails();
      props.onUpdateReservationData();
      handleClose();
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

  useEffect(() => {
    ClientDetails();
  }, []);

  useEffect(() => {
    if (props.reservationId) {
      ReservationDetailSearchID();
    }
  }, [props.reservationId]);

  useEffect(() => {
    if (onChangeDate && onChangeTime) {
      AvailableStylsitDetails();
    }
  }, [onChangeDate, onChangeTime]);

  return (
    <Container>
      <FontAwesomeIcon
        icon={faPen}
        style={{ cursor: "pointer" }}
        onClick={handleOpen}
      />

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
            Update Reservation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <section>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  client_email: reservationInfo.client_email,
                  service_type: reservationInfo.service_type,
                  stylist_email: reservationInfo.stylist_email,
                  reservation_date: reservationInfo.reservation_date,
                  reservation_time: reservationInfo.reservation_time,
                  reservation_status: reservationInfo.reservation_status,
                }}
                onSubmit={onSubmitForm}
              >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className={classes.control}>
                      <label htmlFor="text">Client</label>
                      <select
                        name="client_email"
                        className="form-control"
                        id="selectClient"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.client_email}
                      >
                        <option value={""}>Select Client</option>
                        {clients.map((cli, index) => {
                          return (
                            <option key={cli._id} value={cli.email}>
                              {cli.email}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className={classes.control}>
                      <label htmlFor="text">Service Type</label>
                      <select
                        name="service_type"
                        className="form-control"
                        id="selectservice"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.service_type}
                      >
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
                      <label htmlFor="text">Select Date</label>
                      <input
                        type="date"
                        id="date_id"
                        name="reservation_date"
                        min={moment(CURRENT_DATE).format(DATE_FORMAT)}
                        required
                        value={onChangeDate}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setChangeDate(e.target.value);
                        }}
                      />
                    </div>
                    <div className={classes.control}>
                      <label htmlFor="text">Select Time</label>
                      <select
                        name="reservation_time"
                        className="form-control"
                        id="reservation_time_id"
                        required
                        onBlur={handleBlur}
                        value={onChangeTime}
                        onChange={(e) => {
                          setChangeTime(e.target.value);
                        }}
                      >
                        {timeArray.map((time, index) => {
                          return (
                            <option
                              key={time.id}
                              value={time.time}
                              disabled={
                                parseInt(time.time) < parseInt(currentTime) &&
                                moment(CURRENT_DATE).format(DATE_FORMAT) ===
                                  onChangeDate
                              }
                            >
                              {time.time}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className={classes.control}>
                      <label htmlFor="text">Stylist</label>
                      <select
                        name="stylist_email"
                        className="form-control"
                        id="stylist_id"
                        required
                        value={values.stylist_email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <option value={values.stylist_email}>
                          {values.stylist_email}
                        </option>
                        {availablestylist.map((stylist) => {
                          return (
                            <option key={stylist} value={stylist}>
                              {stylist}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className={classes.control}>
                      <label htmlFor="text">Select Status</label>
                      <select
                        name="reservation_status"
                        className="form-control"
                        id="reservation_status_id"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.reservation_status}
                      >
                        {status.map((stat, index) => {
                          return (
                            <option key={stat.id} value={stat.title}>
                              {stat.title}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button variant="light" type="submit">
                        Update Reservation
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </section>
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default UpdateReservation;
