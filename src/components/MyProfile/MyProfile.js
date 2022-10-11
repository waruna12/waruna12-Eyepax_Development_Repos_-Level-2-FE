import { useRef, useContext, useState, useEffect } from "react";
import classes from "./../Profile/ProfileForm.module.css";
import "react-notifications/lib/notifications.css";
import { UserService } from "./../../services/UserService";
import AuthContext from "./../../store/auth-context";
import * as Yup from "yup";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Container from "react-bootstrap/Container";
import { Formik } from "formik";

const MyProfileForm = () => {
  const authCtx = useContext(AuthContext);

  const formRef = useRef();

  const onSubmitForm = async (values) => {
    try {
      const result = await UserService.userUpdate(
        authCtx.userId,
        values.email,
        values.fname,
        values.lname
      );

      UserDetailSearchID();
      NotificationManager.success(
        "User Success Update",
        "Success",
        "Close after 25000ms",
        10000000000
      );

      return result;
    } catch (err) {
      NotificationManager.error(
        "Cannot update",
        "error",
        "Close after 15000ms",
        10000000000
      );
      return err;
    }
  };

  const [userInfo, setUserInfo] = useState({
    email: "",
    fname: "",
    lname: "",
  });

  const UserDetailSearchID = async () => {
    try {
      const result = await UserService.userDetailsID(authCtx.userId);

      const info = {};

      const cliInfo = result;

      info.email = cliInfo.email;
      info.fname = cliInfo.fname;
      info.lname = cliInfo.lname;

      setUserInfo(info);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    UserDetailSearchID();
  }, []);

  return (
    <Container>
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: userInfo.email,
          fname: userInfo.fname,
          lname: userInfo.lname,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email("Invalid email").required("Required"),
          fname: Yup.string().required("Required"),
          lname: Yup.string().required("Required"),
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
          submitForm,
          handleSubmit,
          /* and other goodies */
        }) => (
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            id="updatePassword"
          >
            <div className={classes.control}>
              <label htmlFor="new-password">Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="id"
                placeholder="Email"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </div>
            <div style={{ color: "red", fontSize: "12px" }}>
              {touched.email && errors.email}
            </div>
            <div className={classes.control}>
              <label htmlFor="new-password">First Name</label>
              <input
                name="fname"
                type="text"
                className="form-control"
                id="id"
                placeholder="Fname"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fname}
              />
            </div>
            <div style={{ color: "red", fontSize: "12px" }}>
              {touched.fname && errors.fname}
            </div>
            <div className={classes.control}>
              <label htmlFor="new-password">Last Name</label>
              <input
                name="lname"
                type="text"
                className="form-control"
                id="id"
                placeholder="Lname"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lname}
              />
            </div>
            <div style={{ color: "red", fontSize: "12px" }}>
              {touched.lname && errors.lname}
            </div>
            <div
              className={classes.action}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5vh",
              }}
            >
              <button>Update Profile</button>
            </div>
          </form>
        )}
      </Formik>
      <NotificationContainer />
    </Container>
  );
};

export default MyProfileForm;
