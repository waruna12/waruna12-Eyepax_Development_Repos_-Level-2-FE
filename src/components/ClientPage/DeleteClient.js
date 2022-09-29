import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./DeleteClient.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ClientService } from "./../../services/ClientService";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const DeleteClient = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDelete = async () => {
    try {
      await ClientService.clientDelete(props.clientId, props.clientEmail);
      props.onClick();

      NotificationManager.success(
        "Client Deleted Success",
        "Success",
        "Close after 25000ms",
        10000000000
      );

      handleClose();
    } catch (err) {
      NotificationManager.error(
        "Cannot delete, Already have an appointment",
        "error",
        "Close after 25000ms",
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
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            <section>
              <p style={{ display: "flex", justifyContent: "center" }}>
                Please ensure and then confirm!
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "5vh",
                }}
              >
                <Button variant="light" onClick={handleClose} type="submit">
                  Cancel
                </Button>

                <Button variant="danger" onClick={onDelete} type="submit">
                  Delete Client
                </Button>
              </div>
            </section>
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default DeleteClient;
