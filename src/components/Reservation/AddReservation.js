import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./AddReservation.module.css";
import { service_type, timeArray, status, event } from "./../../data";
import { ReservationService } from "./../../services/ReservationService";

const AddReservationModel = () => {
  const clients = [
    { id: "1", name: "Waruna Kulathunga" },
    { id: "2", name: "Chamila Hearth" },
  ];

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

  const onSubmitForm = (event) => {
    event.preventDefault();

    const enteredClient = clientInputRef.current.value;
    const enteredService = serviceTypeInputRef.current.value;
    const enteredStylist = stylistInputRef.current.value;
    const enteredDate = reservationDateInputRef.current.value;
    const enteredTime = reservationTimeInputRef.current.value;

    try {
      ReservationService.reservationCreate(
        enteredClient,
        enteredService,
        enteredStylist,
        enteredDate,
        enteredTime
      );
    } catch (err) {
      console.log(err);
    }
  };

  // const onSubmitForm = async (
  //   event,
  //   clientInputRef,
  //   serviceTypeInputRef,
  //   stylistInputRef,
  //   reservationDateInputRef,
  //   reservationTimeInputRef
  // ) => {
  //   //todo extra validations
  //   event.preventDefault();

  //   try {
  //     console.log(clientInputRef.current.value);
  //     await ReservationService.reservationCreate(
  //       clientInputRef.current.value,
  //       serviceTypeInputRef.current.value,
  //       stylistInputRef.current.value,
  //       reservationDateInputRef.current.value,
  //       reservationTimeInputRef.current.value
  //     );
  //      formRef.current.resetForm();

  //     setSubmitLoading(true);
  //     notify("Sucess Add Delivery Area");
  //     deliverySearch();
  //     handleClose();
  //   } catch (err) {

  //   }
  // };

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
                      return (
                        <option key={cli.id} value={cli.id}>
                          {cli.name}
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
                        <option key={service.id} value={service.id}>
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
                    {stylist.map((sty, index) => {
                      return (
                        <option key={sty.id} value={sty.id}>
                          {sty.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="date">Select Date</label>
                  <input
                    type="date"
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
                        <option key={time.id} value={time.id}>
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
