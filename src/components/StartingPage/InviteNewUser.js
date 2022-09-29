import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./InviteNewUser.module.css";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Container from "react-bootstrap/Container";
import { UserService } from "./../../services/UserService";
import Button from "react-bootstrap/Button";

const InviteNewUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    try {
      const response = await UserService.inviteUser(enteredEmail);
      setIsLoading(false);

      NotificationManager.success(
        "Send Email Success",
        "Success",
        "Close after 35000ms",
        10000000000
      );
      document.getElementById("invite_user").reset();
      handleClose();
      return response;
    } catch (err) {
      setIsLoading(false);
      NotificationManager.error(
        "Alredy Invite User",
        "error",
        "Close after 25000ms",
        10000000000
      );
    }
  };

  return (
    <Container>
      <Button variant="light" onClick={handleOpen}>
        Invite New User
      </Button>
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5vh",
                  }}
                >
                  {!isLoading && (
                    <Button type="submit" variant="light">
                      Invite User
                    </Button>
                  )}
                  {isLoading && <p>Sending Email...</p>}
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
