import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./UpdateClient.module.css";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientService } from "./../../services/ClientService";
import { Formik } from "formik";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ClientContext from "./../../store/client-context";
import { sortModel } from "../../data";

const UpdateClient = (props) => {
  const clientCtx = useContext(ClientContext);

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
        values.fname,
        values.lname,
        values.phone_number,
        values.email
      );
      ClientDetails();
      handleClose();
      return result;
    } catch (err) {
      return err;
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
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (props.clientId === "") {
    } else {
      ClientDetailSearchID();
    }
  }, [props.clientId]);

  const ClientDetails = async () => {
    try {
      const result = await ClientService.clientDetails(
        clientCtx.currentPage,
        sortModel
      );
      clientCtx.getAllClientDetails(result);
    } catch (err) {
      return err;
    }
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
              >
                {({
                  values,
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "5vh",
                      }}
                    >
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="light"
                      >
                        Update Client
                      </Button>
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
