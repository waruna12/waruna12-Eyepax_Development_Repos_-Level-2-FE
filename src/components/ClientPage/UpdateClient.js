import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./UpdateClient.module.css";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientService } from "./../../services/ClientService";

const UpdateClient = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [customerinfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    image: "",
    phone: "",
    status: "",
  });

  const ClientDetailSearchID = async () => {
    try {
    } catch (err) {
      //toast
      console.error(err);
    }
    const result = await ClientService.clientDetailsID("customerID");

    const info = {};

    const customerdata = result;

    // info.name = customerdata.name;
    // info.phone = customerdata.phone;
    // info.email = customerdata.email;
    // info.image = customerdata.profile_image;
    // info.status = customerdata.status;

    // setCustomerInfo(info);
  };

  return (
    <div>
      {/* <button onClick={handleOpen} className={classes.button}>
        Add New
      </button> */}
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
              <form onSubmit={""}>
                <div className={classes.control}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" required />
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">First Name</label>
                  <input type="password" id="password" required />
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Last Name</label>
                  <input type="password" id="password" required />
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Phone Number</label>
                  <input type="password" id="password" required />
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
