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

      console.log(response.data.data);

      let responseData = response.data.data;

      return responseData;
    } catch (err) {
      throw err;
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
      throw err;
    }
  };

  static clientDelete = async (clientID) => {
    try {
      let response = await axios({
        method: "delete",
        baseURL: API_ORIGIN + "/client/" + clientID,
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
      throw err;
    }
  };
}