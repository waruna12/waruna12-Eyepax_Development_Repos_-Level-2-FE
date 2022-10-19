import React, { useRef, useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./AddClient.module.css";
import { ClientService } from "./../../services/ClientService";
// import "react-notifications/lib/notifications.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { PHONE_REGEX } from "./../../config/constants";
import ClientContext from "./../../store/client-context";

const AddClientModel = () => {
  const formRef = useRef();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clientCtx = useContext(ClientContext);

  const [searchvalue, setSearchValue] = useState("");
  const replaceSearchValue = searchvalue.replace(/\s+/g, "");

  // const [sortModel, setSortModel] = useState([
  //   {
  //     field: "createdAt",
  //     sort: "asc",
  //   },
  // ]);

  const sortModel = [
    {
      field: "createdAt",
      sort: "asc",
    },
  ];

  const onSubmitForm = async (values) => {
    try {
      const response = await ClientService.createClient(
        values.email,
        values.fname,
        values.lname,
        values.phonenumber
      );

      ClientDetails();
      document.getElementById("create_client").reset();
      handleClose();
      return response;
    } catch (err) {
      return err;
    }
  };

  const ClientDetailSearch = async () => {
    try {
      const result = await ClientService.searchClient(replaceSearchValue);
      clientCtx.getAllClientDetails(result);
    } catch (err) {
      return err;
    }
  };

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

  useEffect(() => {
    if (replaceSearchValue.length > 0) {
      ClientDetailSearch();
    }
  }, [replaceSearchValue]);

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
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      email: "",
                      fname: "",
                      lname: "",
                      phonenumber: "",
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .email("Invalid email")
                        .required("Required"),
                      fname: Yup.string().required("Required"),
                      lname: Yup.string().required("Required"),
                      phonenumber: Yup.string()
                        .matches(PHONE_REGEX, "Phone number is not valid")
                        .required("Phone Number is required"),
                    })}
                    onSubmit={onSubmitForm}
                    innerRef={formRef}
                  >
                    {({
                      errors,
                      handleBlur,
                      handleChange,
                      touched,
                      values,
                      handleSubmit,
                    }) => (
                      <form onSubmit={handleSubmit} id="create_client">
                        <div className={classes.control}>
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            name="email"
                            required
                            className="form-control"
                            id="email_id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                        </div>
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {touched.email && errors.email}
                        </div>
                        <div className={classes.control}>
                          <label htmlFor="text">First Name</label>
                          <input
                            type="text"
                            name="fname"
                            required
                            className="form-control"
                            id="fname_id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fname}
                          />
                        </div>
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {touched.fname && errors.fname}
                        </div>
                        <div className={classes.control}>
                          <label htmlFor="text">Last Name</label>
                          <input
                            type="text"
                            name="lname"
                            required
                            className="form-control"
                            id="lname_id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lname}
                          />
                        </div>
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {touched.lname && errors.lname}
                        </div>
                        <div className={classes.control}>
                          <label htmlFor="phone">Phone Number</label>
                          <input
                            type="phone"
                            name="phonenumber"
                            required
                            className="form-control"
                            id="phone_id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phonenumber}
                          />
                        </div>
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {touched.phonenumber && errors.phonenumber}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "5vh",
                          }}
                        >
                          <Button type="submit" variant="light">
                            Add New Client
                          </Button>
                        </div>
                      </form>
                    )}
                  </Formik>
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
