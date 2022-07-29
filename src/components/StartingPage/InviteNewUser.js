import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./InviteNewUser.module.css";
import emailjs from "emailjs-com";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

const InviteNewUser = () => {
  const form = useRef();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  var templateParams = {
    name: "James",
    notes: "Check this out!",
  };

  function sendEmail(e) {
    e.preventDefault();

    console.log(form.current);

    emailjs
      .sendForm(
        "service_i5n3mxr",
        "template_92l5bzf",
        e.target,
        "zx5XX-Y7Yzw_AZjPQ"
      )
      .then(
        (result) => {
          console.log(result.text);
          NotificationManager.success("Invitation Send successful", "Success");
          handleClose();
        },
        (error) => {
          console.log(error.text);
        }
      );
    form.current.reset();
  }

  return (
    <div>
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
              <form onSubmit={sendEmail} ref={form}>
                <div className={classes.control}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" required name="email" />
                </div>
                <div className={classes.actions}>
                  <button>Invite</button>
                </div>
              </form>
            </section>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default InviteNewUser;
