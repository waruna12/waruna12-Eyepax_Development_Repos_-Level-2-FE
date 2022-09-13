import axios from "axios";
import { API_ORIGIN } from "../config/constants";

export class UserService {
  static userCreate = async (
    token,
    enteredEmail,
    enteredFname,
    enteredPassword
  ) => {
    try {
      let response = await axios({
        method: "post",
        baseURL: API_ORIGIN + `/signup/${token}`,
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

      console.log(response.data.success);
      console.log(response.data.data);

      if (response.data.success !== false) {
        let responseData = response.data.data;

        return responseData;
      } else {
        throw Error("Invalid User Credentials ");
      }

      // console.log(response);

      // let responseData = response.data.data;

      // return responseData;
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
