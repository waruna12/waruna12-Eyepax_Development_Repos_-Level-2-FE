import axios from "axios";
import { API_ORIGIN } from "../config/constants";

export class UserService {
  static userCreate = async (
    enteredFname,
    enteredLname,
    enteredUserType,
    enteredEmail,
    enteredPassword
  ) => {
    try {
      let response = await axios({
        method: "post",
        baseURL: API_ORIGIN + "/signup",
        data: {
          fname: enteredFname,
          lname: enteredLname,
          type: enteredUserType,
          email: enteredEmail,
          password: enteredPassword,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      let responseData = response.data.data;

      return responseData;
    } catch (err) {
      throw err;
    }
  };

  static userLogin = async (enteredEmail, enteredPassword) => {
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

      console.log(response);
      if (response.data.success !== false) {
        let responseData = response.data.data;

        return responseData;
      } else {
        throw Error("Login Fail");
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}
