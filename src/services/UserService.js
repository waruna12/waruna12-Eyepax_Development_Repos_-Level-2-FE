import axios from "axios";
import { API_ORIGIN } from "../config/constants";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

export class UserService {
  static userDetails = async () => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/user",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let userDetails = response.data.data;
      return userDetails;
    } catch (err) {
      NotificationManager.error(err.response.data.message, "error");
      throw Error(err);
    }
  };

  static inviteUser = async (enterEmail) => {
    try {
      let response = await axios({
        method: "post",
        baseURL: API_ORIGIN + "/invite-user",
        data: {
          email: enterEmail,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success !== false) {
        let inviteUserDetail = response.data.data;

        return inviteUserDetail;
      } else {
        throw Error("Email Send Failed");
      }
    } catch (err) {
      throw Error(err);
    }
  };

  static passwordUpdate = async (userID, newPassword) => {
    try {
      let response = await axios({
        method: "put",
        baseURL: API_ORIGIN + "/user/" + userID + "/" + newPassword,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success !== false) {
        let responseData = response.data.data;

        return responseData;
      } else {
        throw Error("client validation failed");
      }
    } catch (err) {
      throw Error(err);
    }
  };

  static findUser = async (email) => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/user/" + email,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success !== false) {
        let findUserDetail = response.data.data;

        return findUserDetail;
      }
    } catch (err) {
      throw Error(err);
    }
  };

  static userSearch = async (key) => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/user/search/" + key,
        headers: {
          "Content-Type": "application/json",
        },
      });

      let userDetailSearch = response.data.data;
      return userDetailSearch;
    } catch (err) {
      throw Error(err);
    }
  };

  static userDetailsID = async (userID) => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/user/" + userID,
        headers: {
          "Content-Type": "application/json",
        },
      });

      let userDetailID = response.data.data;

      return userDetailID;
    } catch (err) {
      throw Error(err);
    }
  };

  static userUpdate = async (
    userID,
    enteredEmail,
    enteredFname,
    enteredLname
  ) => {
    try {
      let response = await axios({
        method: "put",
        baseURL: API_ORIGIN + "/user/" + userID,
        data: {
          email: enteredEmail,
          fname: enteredFname,
          lname: enteredLname,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success !== false) {
        let responseData = response.data.data;

        return responseData;
      } else {
        throw Error("User validation failed");
      }
    } catch (err) {
      throw Error(err.response.data.message);
    }
  };
}
