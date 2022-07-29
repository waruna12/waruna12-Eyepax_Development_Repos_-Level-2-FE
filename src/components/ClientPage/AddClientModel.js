import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./AddClient.module.css";
import { ClientService } from "./../../services/ClientService";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

const AddClientModel = (props) => {
  const [newclientadd, setNewClientAdded] = useState(false);

  props.onSaveClientData(newclientadd);

  const emailInputRef = useRef();
  const fnameInputRef = useRef();
  const lnameInputRef = useRef();
  const phoneNumberInputRef = useRef();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFname = fnameInputRef.current.value;
    const enteredLname = lnameInputRef.current.value;
    const enteredPhonenumber = phoneNumberInputRef.current.value;

    try {
      const response = await ClientService.clientCreate(
        enteredEmail,
        enteredFname,
        enteredLname,
        enteredPhonenumber
      );

      setNewClientAdded(true);
      NotificationManager.success("Client Success Added", "Success");
      document.getElementById("create_client").reset();
      handleClose();
    } catch (err) {
      console.log(err);
      NotificationManager.error("Client Added Faield", "error");
    }
  };

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
            Add New Client
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <section>
              <form onSubmit={submitHandler} id="create_client">
                <div className={classes.control}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    ref={emailInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="text">First Name</label>
                  <input
                    type="text"
                    id="fname"
                    name="name"
                    required
                    ref={fnameInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="text">Last Name</label>
                  <input
                    type="text"
                    id="text"
                    name="lname"
                    required
                    ref={lnameInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    required
                    ref={phoneNumberInputRef}
                  />
                </div>

                <div className={classes.actions}>
                  <button>Add New</button>
                </div>
              </form>
            </section>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default AddClientModel;
