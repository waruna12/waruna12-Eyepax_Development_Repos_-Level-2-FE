import axios from "axios";
import { API_ORIGIN } from "../config/constants";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

export class ClientService {
  static clientCreate = async (
    enteredEmail,
    enteredFname,
    enteredLname,
    enteredPhonenumber
  ) => {
    try {
      let response = await axios({
        method: "post",
        baseURL: API_ORIGIN + "/client",
        data: {
          fname: enteredFname,
          lname: enteredLname,
          phone_number: enteredPhonenumber,
          email: enteredEmail,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success === true) {
        NotificationManager.success(response.data.message, "Success");
        let responseData = response.data.data;

        return responseData;
      }
    } catch (err) {
      var errorObject = err.response.data.error;
      NotificationManager.error(Object.values(errorObject)[0], "error");
      throw Error(err);
    }
  };

  static clientDetails = async () => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/client",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let clientDetail = response.data.data;

      return clientDetail;
    } catch (err) {
      NotificationManager.error(err.response.data.message, "error");
      throw Error(err);
    }
  };

  static clientDetailsID = async (clientID) => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/client/" + clientID,
        headers: {
          "Content-Type": "application/json",
        },
      });
      let clientDetailByID = response.data.data;
      return clientDetailByID;
    } catch (err) {
      NotificationManager.error(err.response.data.message, "error");
      throw Error(err);
    }
  };

  static clientUpdate = async (
    clientID,
    enteredFname,
    enteredLname,
    enteredPhonenumber,
    enteredEmail
  ) => {
    try {
      let response = await axios({
        method: "put",
        baseURL: API_ORIGIN + "/client/" + clientID,
        data: {
          fname: enteredFname,
          lname: enteredLname,
          phone_number: enteredPhonenumber,
          email: enteredEmail,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success === true) {
        let responseData = response.data.data;
        NotificationManager.success(response.data.message, "Success");
        return responseData;
      }
    } catch (err) {
      if (err.response.status === 400) {
        NotificationManager.error(err.response.data.message, "error");
        throw Error(err);
      } else {
        var errorObject = err.response.data.error;
        NotificationManager.error(Object.values(errorObject)[0], "error");
        throw Error(err);
      }
    }
  };

  static clientDelete = async (clientID, clientEmail) => {
    try {
      let response = await axios({
        method: "delete",
        baseURL: API_ORIGIN + "/client/" + clientID,
        data: {
          email: clientEmail,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success === true) {
        let responseData = response.data.data;
        NotificationManager.success(response.data.message, "Success");
        return responseData;
      }
    } catch (err) {
      NotificationManager.error(err.response.data.message, "error");
      throw Error(err);
    }
  };

  static clientSearch = async (key) => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/client/search/" + key,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success === true) {
        let clientDetailSearch = response.data.data;
        return clientDetailSearch;
      }
    } catch (err) {
      throw Error(err);
    }
  };
}
