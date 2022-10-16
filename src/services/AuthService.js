import axios from "axios";
import { API_ORIGIN } from "../config/constants";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

export class MainUserService {
  static signUpUser = async (
    token,
    enteredEmail,
    enteredFname,
    enteredPassword
  ) => {
    try {
      let response = await axios({
        method: "post",
        baseURL: API_ORIGIN + `/signUp/${token}`,
        data: {
          fname: enteredFname,
          lname: "test",
          type: "test",
          email: enteredEmail,
          password: enteredPassword,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success !== false) {
        let responseData = response.data.data;
        return responseData;
      }
    } catch (err) {
      NotificationManager.error(
        err.response.data.message,
        "error",
        "Close after 3000ms",
        3000
      );
      throw Error(err);
    }
  };

  static loginUser = async (enteredEmail, enteredPassword) => {
    try {
      let response = await axios({
        method: "post",
        baseURL: API_ORIGIN + "/login",
        data: {
          email: enteredEmail,
          password: enteredPassword,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success !== false) {
        let responseData = response.data.data;
        return responseData;
      }
    } catch (err) {
      NotificationManager.error(
        err.response.data.message,
        "error",
        "Close after 3000ms",
        3000
      );
      throw Error(err);
    }
  };
}
