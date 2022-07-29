import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { user_type } from "../../data";
import classes from "./AuthForm.module.css";
import { UserService } from "./../../services/AuthService";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const AuthForm = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const fnameInputRef = useRef();
  const lnameInputRef = useRef();
  const userTypeInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    //add validaion

    setIsLoading(true);

    let url;

    if (isLogin) {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      try {
        const response = await UserService.userLogin(
          enteredEmail,
          enteredPassword
        );

        // NotificationManager.success("User Login Success", "Success");
        authCtx.login(response.token);
        setIsLoading(false);
        history.replace("/");

        // console.log(response.token);waruna
        // document.getElementById("create_client").reset();
        // handleClose();
        // formRef.current.resetForm();
      } catch (err) {
        // console.log(err);
        setIsLoading(false);
        NotificationManager.error("User Login Faield", "error");
      }
    } else {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredFname = fnameInputRef.current.value;
      const enteredLname = lnameInputRef.current.value;
      const enteredUserType = userTypeInputRef.current.value;
      try {
        const response = await UserService.userCreate(
          enteredFname,
          enteredLname,
          enteredUserType,
          enteredEmail,
          enteredPassword
        );

        // NotificationManager.success("User Register Success", "Success");
        authCtx.login(response.token);
        history.replace("/");

        // document.getElementById("create_client").reset();
        // handleClose();
        // formRef.current.resetForm();

        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
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
        )}
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="text">Your Last Name</label>
            <input
              type="text"
              id="lname"
              name="lname"
              required
              ref={lnameInputRef}
            />
          </div>
        )}
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="text">User Type</label>
            <select name="userType" required ref={userTypeInputRef}>
              <option value="">Select User Type</option>
              {user_type.map((user, index) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.user}
                  </option>
                );
              })}
            </select>
          </div>
        )}
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

        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
      <NotificationContainer />
    </section>
  );
};

export default AuthForm;
