import { useRef, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";
import { MainUserService } from "./../../services/AuthService";
import { UserService } from "./../../services/UserService";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import Container from "react-bootstrap/Container";

const SignUp = () => {
  const history = useHistory();
  const params = useParams();

  const formRef = useRef();

  const authCtx = useContext(AuthContext);

  const onSubmitForm = async (values) => {
    try {
      const result = await MainUserService.signUpUser(
        params.token,
        values.email,
        values.fname,
        values.password
      );

      authCtx.login(result.token, result.usetId);
      history.replace("/");
    } catch (err) {
      return err;
    }
  };

  const [formContentShow, setFormContentShow] = useState(false);
  const [contentShow, setContentShow] = useState(false);

  const findUser = async () => {
    try {
      const response = await UserService.findUser(params.email);

      if (response) {
        setFormContentShow(true);
      } else {
        setContentShow(true);
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    findUser();
  }, [params.email]);

  return (
    <Container>
      <h1
        className={classes.auth_error}
        style={{ textAlign: "center" }}
        hidden={contentShow}
      >
        Alredy SignUp
      </h1>
      <section className={classes.auth} hidden={formContentShow}>
        <h1>Sign Up</h1>
        <Formik
          enableReinitialize={true}
          initialValues={{
            email: params.email,
            fname: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object().shape({
            fname: Yup.string().required("Required"),
            password: Yup.string()
              .required("Required")
              .min(6, "password must have at least 6 characters")
              .max(25, "password must have less than 25 characters"),
            confirmPassword: Yup.string().when("password", {
              is: (val) => (val && val.length > 0 ? true : false),
              then: Yup.string().oneOf(
                [Yup.ref("password")],
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
            <form onSubmit={handleSubmit}>
              <div className={classes.control}>
                <label htmlFor="email">Your Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="emai_id"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  disabled
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="text">Your First Name</label>
                <input
                  name="fname"
                  type="text"
                  className="form-control"
                  id="id"
                  placeholder="First Name"
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
                <label htmlFor="password">Your Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="id"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </div>
              <div style={{ color: "red", fontSize: "12px" }}>
                {touched.password && errors.password}
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
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "5vh",
                }}
              >
                <Button variant="light" type="submit">
                  User SignUp
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </section>
    </Container>
  );
};

export default SignUp;
