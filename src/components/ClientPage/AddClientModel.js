import React, { useRef, useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./AddClient.module.css";
import { ClientService } from "./../../services/ClientService";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ClientContext } from "./../../store/client-context";

const AddClientModel = () => {
  const [clients, setClients] = useContext(ClientContext);

  const [searchvalue, setSearchValue] = useState("");

  let replaceSearchValue = searchvalue.replace(/\s+/g, "");

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

      ClientDetails();
      NotificationManager.success(
        "Client Success Added",
        "Success",
        "Close after 100000ms",
        10000000000
      );
      document.getElementById("create_client").reset();
      handleClose();
      return response;
    } catch (err) {
      NotificationManager.error(
        "Email alredy registered",
        "error",
        "Close after 25000ms",
        10000000000
      );
    }
  };

  const ClientDetailSearch = async () => {
    try {
      const result = await ClientService.clientSearch(replaceSearchValue);
      setClients(result);
    } catch (err) {}
  };

  useEffect(() => {
    if (replaceSearchValue.length > 0) {
      ClientDetailSearch();
    }
  }, [replaceSearchValue]);

  const ClientDetails = async () => {
    try {
      const result = await ClientService.clientDetails();
      setClients(result);
    } catch (err) {}
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col sm={4}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search here"
              aria-label="Search here"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                setSearchValue(e.target.value);
                if (e.target.value === "") {
                  ClientDetails();
                }
              }}
            />
          </InputGroup>
        </Col>
        <Col sm={8} style={{ display: "flex", justifyContent: "end" }}>
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
        </Col>
      </Row>
    </Container>
  );
};

export default AddClientModel;
