import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";
import { MainUserService } from "./../../services/AuthService";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Button from "react-bootstrap/Button";

const AuthForm = () => {
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (isLogin) {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      try {
        const response = await MainUserService.userLogin(
          enteredEmail,
          enteredPassword
        );

        authCtx.login(response.token, response.usetId);
        setIsLoading(false);
        setIsLogin(true);
        history.replace("/");
      } catch (err) {
        setIsLoading(false);
        return err;
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "4vh",
          }}
        >
          {!isLoading && (
            <Button variant="light" type="submit">
              {isLogin ? "User Login" : "Create Account"}
            </Button>
          )}
          {isLoading && <p>Loading...</p>}
        </div>
      </form>
      <NotificationContainer />
    </section>
  );
};

export default AuthForm;
