import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./UpdateReservation.module.css";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { service_type, timeArray, status } from "./../../data";

const UpdateReservation = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clients = [
    { id: "1", name: "Waruna Kulathunga" },
    { id: "2", name: "Chamila Hearth" },
  ];

  const stylist = [
    { id: "1", name: "Ron Jesen" },
    { id: "2", name: "Zamir Ahmed" },
  ];

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
              <form onSubmit={""}>
                <div className={classes.control}>
                  <label htmlFor="email">Client</label>
                  <select name="" required>
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
                  <select name="" required>
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
                  <select name="" required>
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
                  <label htmlFor="password">Select Date</label>
                  <input type="date" id="password" required />
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Select Time</label>
                  <select name="" required>
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
                <div className={classes.control}>
                  <label htmlFor="password">Select Status</label>
                  <select name="" required>
                    <option value="">Select Status</option>
                    {status.map((stat, index) => {
                      return (
                        <option key={stat.id} value={stat.id}>
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
            </section>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateReservation;
