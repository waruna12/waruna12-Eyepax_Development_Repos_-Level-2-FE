import axios from "axios";
import { API_ORIGIN } from "../config/constants";

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

      let clientDetailID = response.data.data;

      return clientDetailID;
    } catch (err) {
      throw Error(err);
    }
  };

  static clientUpdate = async (
    clientID,
    clientEmail,
    enteredFname,
    enteredLname,
    enteredPhonenumber,
    enteredEmail
  ) => {
    try {
      let response = await axios({
        method: "put",
        baseURL: API_ORIGIN + "/client/" + clientID + "/" + clientEmail,
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

      if (response.data.success !== false) {
        let responseData = response.data.data;
        return responseData;
      } else {
        throw Error("Cannot delete, Already have an appointment");
      }
    } catch (err) {
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

      let clientDetailSearch = response.data.data;

      return clientDetailSearch;
    } catch (err) {
      throw Error(err);
    }
  };
}
