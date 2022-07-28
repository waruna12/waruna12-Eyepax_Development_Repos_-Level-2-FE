import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./InviteNewUser.module.css";

const InviteNewUser = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <form onSubmit={""}>
                <div className={classes.control}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" required />
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
