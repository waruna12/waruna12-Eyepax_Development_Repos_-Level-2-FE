import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./UpdateClient.module.css";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientService } from "./../../services/ClientService";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

const UpdateClient = (props) => {
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpen = () => {
    setOpen(true);
    // ClientDetailSearchID();
  };

  const [email, setEmail] = useState("");

  const [clientInfo, setClientInfo] = useState({
    email: "",
    fname: "",
  });

  const emailInputRef = useRef();
  const fnameInputRef = useRef();
  const lnameInputRef = useRef();
  const phoneNumberInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFname = fnameInputRef.current.value;
    const enteredLname = lnameInputRef.current.value;
    const enteredPhonenumber = phoneNumberInputRef.current.value;

    try {
      ClientService.clientUpdate(
        props.clientId,
        enteredEmail,
        enteredFname,
        enteredLname,
        enteredPhonenumber
      );
      // props.onClick();
      NotificationManager.success("Client Success Update", "Success");

      handleClose();
      // formRef.current.resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const ClientDetailSearchID = async () => {
    try {
      const result = await ClientService.clientDetailsID(props.clientId);

      console.log(result);

      const info = {};

      const cliInfo = result;

      info.email = cliInfo.email;
      info.fname = cliInfo.fname;

      setClientInfo(info);
      // setEmail(result.email);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    if (props.clientId == "") {
    } else {
      ClientDetailSearchID();
    }
  }, [props.clientId]);

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
            Update Client
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <section>
              <form onSubmit={submitHandler}>
                <div className={classes.control}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    // defaultValue={email}
                    // ref={emailInputRef}
                    value={clientInfo.email}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="fname">First Name</label>
                  <input
                    type="text"
                    id="fname"
                    required
                    // defaultValue={props.fname}
                    ref={fnameInputRef}
                    value={clientInfo.fname}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Last Name</label>
                  <input
                    type="text"
                    id="text"
                    required
                    // defaultValue={clientInfo.lname}
                    ref={lnameInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="phonenumber">Phone Number</label>
                  <input
                    type="phonenumber"
                    id="phonenumber"
                    required
                    // defaultValue={clientInfo.phone_number}
                    ref={phoneNumberInputRef}
                  />
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

export default UpdateClient;
