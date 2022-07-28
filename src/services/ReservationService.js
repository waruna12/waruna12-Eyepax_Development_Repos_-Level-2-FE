import axios from "axios";
import { API_ORIGIN } from "../config/constants";

export class ReservationService {
  static reservationCreate = async (
    enteredClient,
    enteredService,
    enteredStylist,
    enteredDate,
    enteredTime
  ) => {
    try {
      let response = await axios({
        method: "post",
        baseURL: API_ORIGIN + "/reservation",
        data: {
          client: enteredClient,
          service_type: enteredService,
          stylist: enteredStylist,
          reservation_date: enteredDate,
          reservation_time: enteredTime,
          reservation_status: "",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      // console.log(response.data.data);

      let responseData = response.data.data;

      return responseData;
    } catch (err) {
      throw err;
    }
  };

  static reservationDetails = async () => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/reservation",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let reservationDetail = response.data.data;

      return reservationDetail;
    } catch (err) {
      throw err;
    }
  };

  static reservationDelete = async (reservationID) => {
    try {
      let response = await axios({
        method: "delete",
        baseURL: API_ORIGIN + "/reservation/" + reservationID,
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

  static reservationIDDetailsID = async (reservationIDID) => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/reservation/" + reservationIDID,
        headers: {
          "Content-Type": "application/json",
        },
      });

      let reservationIDDetailID = response.data.data;

      return reservationIDDetailID;
    } catch (err) {
      throw err;
    }
  };
}
