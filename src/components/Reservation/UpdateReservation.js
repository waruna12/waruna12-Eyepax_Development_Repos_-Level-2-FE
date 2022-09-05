import React, { useEffect, useState } from "react";
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
import { UserService } from "./../../services/UserService";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

const UpdateReservation = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [clients, setClients] = useState([]);

  const [users, setUser] = useState([]);

  // const clients = [
  //   { id: "1", name: "Waruna Kulathunga" },
  //   { id: "2", name: "Chamila Hearth" },
  // ];

  const stylist = [
    { id: "1", name: "Ron Jesen" },
    { id: "2", name: "Zamir Ahmed" },
  ];

  const [reservationInfo, setReservationInfo] = useState({
    client: "",
    service_type: "",
    stylist: "",
    reservation_date: "",
    reservation_time: "",
    reservation_status: "",
  });

  const ReservationDetailSearchID = async () => {
    try {
      const result = await ReservationService.reservationIDDetailsID(
        props.reservationId
      );

      const info = {};

      const reservationInfo = result;

      info.client = reservationInfo.client;
      info.service_type = reservationInfo.service_type;
      info.stylist = reservationInfo.stylist;
      info.reservation_date = reservationInfo.reservation_date;
      info.reservation_time = reservationInfo.reservation_time;
      info.reservation_status = reservationInfo.reservation_status;

      setReservationInfo(info);
    } catch (err) {
      // console.log(err);
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

  const onSubmitForm = (values) => {
    try {
      ReservationService.reservationUpdate(
        props.reservationId,
        values.client,
        values.service_type,
        values.stylist,
        values.reservation_date,
        values.reservation_time,
        values.reservation_status
      );

      // props.onClick();
      props.onUpdateReservationData();
      NotificationManager.success("Client Success Update", "Success");
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    ClientDetails();
    UserDetails();
  }, []);

  useEffect(() => {
    if (props.reservationId === "") {
    } else {
      ReservationDetailSearchID();
    }
  }, [props.reservationId]);

  return (
    <div>
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
                  client: reservationInfo.client,
                  service_type: reservationInfo.service_type,
                  stylist: reservationInfo.stylist,
                  reservation_date: reservationInfo.reservation_date,
                  reservation_time: reservationInfo.reservation_time,
                  reservation_status: reservationInfo.reservation_status,
                }}
                onSubmit={onSubmitForm}
                // innerRef={formRef}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className={classes.control}>
                      <label htmlFor="text">Client</label>
                      <select
                        name="client"
                        className="form-control"
                        id="selectClient"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.client}
                      >
                        <option value={""}>Select Client</option>
                        {clients.map((cli, index) => {
                          return (
                            <option key={cli.fname} value={cli.fname}>
                              {cli.fname}
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
                      <label htmlFor="text">Stylist</label>
                      <select
                        name="stylist"
                        className="form-control"
                        id="stylist_id"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.stylist}
                      >
                        {users.map((user, index) => {
                          return (
                            <option key={user._id} value={user.fname}>
                              {user.fname}
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
                        required
                        value={values.reservation_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className={classes.control}>
                      <label htmlFor="text">Select Time</label>
                      <select
                        name="reservation_time"
                        className="form-control"
                        id="reservation_time_id"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.reservation_time}
                      >
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

                    <div className={classes.actions}>
                      <button>Update</button>
                    </div>
                  </form>
                )}
              </Formik>
            </section>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateReservation;
