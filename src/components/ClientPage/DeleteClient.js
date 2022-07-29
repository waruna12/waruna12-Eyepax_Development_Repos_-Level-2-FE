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

const DeleteClient = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDelete = async () => {
    //todo extra validations

    try {
      await ClientService.clientDelete(props.clientId);
      props.onClick();

      NotificationManager.success("Client Deleted Success", "Success");

      handleClose();
      // customerSearch();
    } catch (err) {
      // notifyWarning(err.response.data.message);
      // setSubmitLoading(true);
      //show error toast
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default DeleteClient;
