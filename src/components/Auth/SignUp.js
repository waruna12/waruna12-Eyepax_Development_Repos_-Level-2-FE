import { useRef, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";
import { UserService } from "./../../services/AuthService";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const SignUp = () => {
  const history = useHistory();
  const params = useParams();

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const fnameInputRef = useRef();

  const submitHandler1 = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFname = fnameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const response = await UserService.userCreate(
        params.token,
        enteredEmail,
        enteredFname,
        enteredPassword
      );

      // NotificationManager.success(
      //   "Success user Registered",
      //   "Success",
      //   "Close after 25000ms",
      //   25000
      // );

      authCtx.login(response.token, response.usetId);
      history.replace("/");
    } catch (err) {
      NotificationManager.error(
        "Invalid User Credentials",
        "error",
        "Close after 25000ms",
        45000
      );
    }
  };

  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler1}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            value={params.email}
            disabled
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="text">Your First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            required
            ref={fnameInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>

        <div className={classes.actions}>
          <button>SignUp</button>
        </div>
      </form>
      <NotificationContainer />
    </section>
  );
};

export default SignUp;
