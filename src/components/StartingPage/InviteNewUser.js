import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./InviteNewUser.module.css";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Container from "react-bootstrap/Container";
import { UserService } from "./../../services/UserService";

const InviteNewUser = () => {
  const emailInputRef = useRef();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    try {
      const response = await UserService.inviteUser(enteredEmail);

      NotificationManager.success(
        "Send Email Success",
        "Success",
        "Close after 35000ms",
        35000
      );
      document.getElementById("invite_user").reset();
      handleClose();
    } catch (err) {
      NotificationManager.error(
        "Alredy Invite User",
        "error",
        "Close after 25000ms",
        25000
      );
    }
  };

  return (
    <Container>
      <button onClick={handleOpen} className={classes.button}>
        Invite New User
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
            Invite User
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <section>
              <form onSubmit={submitHandler} id="invite_user">
                <div className={classes.control}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    name="email"
                    ref={emailInputRef}
                  />
                </div>
                <div className={classes.actions}>
                  <button>Invite</button>
                </div>
              </form>
            </section>
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default InviteNewUser;
