import { useRef, useContext } from "react";
import classes from "./ProfileForm.module.css";
import "react-notifications/lib/notifications.css";
import { UserService } from "./../../services/UserService";
import AuthContext from "./../../store/auth-context";
import * as Yup from "yup";
import { NotificationContainer } from "react-notifications";
import Container from "react-bootstrap/Container";
import { Formik } from "formik";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);

  const formRef = useRef();

  const onSubmitForm = async (values) => {
    try {
      const result = await UserService.passwordUpdate(
        authCtx.userId,
        values.newPassword
      );
      formRef.current.resetForm();
      return result;
    } catch (err) {
      return err;
    }
  };

  return (
    <Container>
      <Formik
        enableReinitialize={true}
        initialValues={{
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object().shape({
          newPassword: Yup.string()
            .required("Required")
            .min(6, "password must have at least 6 characters")
            .max(25, "password must have less than 25 characters"),
          confirmPassword: Yup.string().when("newPassword", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("newPassword")],
              "Both password need to be the same"
            ),
          }),
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
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            id="updatePassword"
          >
            <div className={classes.control}>
              <label htmlFor="new-password">New Password</label>
              <input
                name="newPassword"
                type="password"
                className="form-control"
                id="id"
                placeholder="New Password"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.newPassword}
              />
            </div>
            <div style={{ color: "red", fontSize: "12px" }}>
              {touched.newPassword && errors.newPassword}
            </div>
            <div className={classes.control}>
              <label htmlFor="new-password">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                className="form-control"
                id="id"
                placeholder="Confirm Password"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
            </div>
            <div style={{ color: "red", fontSize: "12px" }}>
              {touched.confirmPassword && errors.confirmPassword}
            </div>
            <div
              className={classes.action}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5vh",
              }}
            >
              <button> Change Password</button>
            </div>
          </form>
        )}
      </Formik>
      <NotificationContainer />
    </Container>
  );
};

export default ProfileForm;
