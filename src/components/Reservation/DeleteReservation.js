import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./DeleteReservation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ReservationService } from "./../../services/ReservationService";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Container from "react-bootstrap/Container";

const DeleteReservation = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDelete = async () => {
    try {
      await ReservationService.reservationDelete(props.reservationId);
      NotificationManager.success(
        "Reservation Deleted Success",
        "Success",
        "Close after 15000ms",
        10000000000
      );
      props.onClick();
      handleClose();
    } catch (err) {
      NotificationManager.error(
        "Reservation Deleted Failed",
        "error",
        "Close after 15000ms",
        10000000000
      );
    }
  };

  return (
    <Container>
      <FontAwesomeIcon
        icon={faTrash}
        onClick={handleOpen}
        style={{ cursor: "pointer" }}
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
            Delete ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <section>
              <p style={{ display: "flex", justifyContent: "center" }}>
                Please ensure and then confirm!
              </p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <button className={classes.button} onClick={handleClose}>
                  Cancel
                </button>
                <button className={classes.button_red} onClick={onDelete}>
                  Delete
                </button>
              </div>
            </section>
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default DeleteReservation;
