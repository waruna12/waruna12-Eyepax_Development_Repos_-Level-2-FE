import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./UpdateClient.module.css";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientService } from "./../../services/ClientService";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Formik } from "formik";
import Container from "react-bootstrap/Container";
import { ClientContext } from "./../../store/client-context";

const UpdateClient = (props) => {
  const [clients, setClients] = useContext(ClientContext);
  props.onUpdateClientData(false);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleOpen = () => {
    setOpen(true);
    ClientDetailSearchID();
  };

  const [clientInfo, setClientInfo] = useState({
    email: "",
    fname: "",
    lname: "",
    phone_number: "",
  });

  const onSubmitForm = async (values) => {
    try {
      const result = await ClientService.clientUpdate(
        props.clientId,
        props.clientEmail,
        values.fname,
        values.lname,
        values.phone_number,
        values.email
      );

      ClientDetails();
      props.onUpdateClientData(true);
      NotificationManager.success(
        "Client Success Update",
        "Success",
        "Close after 25000ms",
        25000
      );
      handleClose();
      return result;
    } catch (err) {
      NotificationManager.error(
        "Cannot update , Already have an appointment",
        "error",
        "Close after 15000ms",
        25000
      );
    }
  };

  const ClientDetailSearchID = async () => {
    try {
      const result = await ClientService.clientDetailsID(props.clientId);

      const info = {};

      const cliInfo = result;

      info.email = cliInfo.email;
      info.fname = cliInfo.fname;
      info.lname = cliInfo.lname;
      info.phone_number = cliInfo.phone_number;

      setClientInfo(info);
    } catch (err) {}
  };

  useEffect(() => {
    if (props.clientId === "") {
    } else {
      ClientDetailSearchID();
    }
  }, [props.clientId]);

  const ClientDetails = async () => {
    try {
      const result = await ClientService.clientDetails();
      setClients(result);
    } catch (err) {}
  };

  return (
    <Container>
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
              <Formik
                enableReinitialize={true}
                initialValues={{
                  email: clientInfo.email,
                  fname: clientInfo.fname,
                  lname: clientInfo.lname,
                  phone_number: clientInfo.phone_number,
                }}
                onSubmit={onSubmitForm}
                // innerRef={formRef}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className={classes.control}>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </div>
                    {/* {errors.email && touched.email && errors.email} */}
                    <div className={classes.control}>
                      <label htmlFor="fname">First Name</label>
                      <input
                        type="text"
                        id="fname"
                        name="fname"
                        required
                        value={values.fname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className={classes.control}>
                      <label htmlFor="password">Last Name</label>
                      <input
                        type="text"
                        id="text"
                        name="lname"
                        required
                        value={values.lname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className={classes.control}>
                      <label htmlFor="phonenumber">Phone Number</label>
                      <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        required
                        value={values.phone_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className={classes.actions}>
                      <button disabled={isSubmitting} type="submit">
                        Update
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </section>
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default UpdateClient;
