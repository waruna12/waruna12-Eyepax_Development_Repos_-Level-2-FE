import axios from "axios";
import { API_ORIGIN } from "../config/constants";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

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
          client_email: enteredClient,
          service_type: enteredService,
          stylist_email: enteredStylist,
          reservation_date: enteredDate,
          reservation_time: enteredTime,
          reservation_status: "Todo",
          reservation_count: 1,
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
      NotificationManager.error(err.response.data.message, "error");
      throw Error(err);
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

  static reservationDetailsID = async (reservationID) => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/reservation/" + reservationID,
        headers: {
          "Content-Type": "application/json",
        },
      });

      let reservationIDDetailID = response.data.data;
      return reservationIDDetailID;
    } catch (err) {
      throw Error(err);
    }
  };

  static reservationUpdate = async (
    reservationID,
    enteredClient,
    enteredServiceType,
    enteredStylist,
    enteredReservationDate,
    enteredReservationTime,
    enteredReservationStatus
  ) => {
    try {
      let response = await axios({
        method: "put",
        baseURL: API_ORIGIN + "/reservation/" + reservationID,
        data: {
          client_email: enteredClient,
          service_type: enteredServiceType,
          stylist_email: enteredStylist,
          reservation_date: enteredReservationDate,
          reservation_time: enteredReservationTime,
          reservation_status: enteredReservationStatus,
          reservation_count: 1,
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

  static reservationSearch = async (key) => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/reservation/search/" + key,
        headers: {
          "Content-Type": "application/json",
        },
      });

      let reservationDetailSearch = response.data.data;
      return reservationDetailSearch;
    } catch (err) {
      throw Error(err);
    }
  };

  static reservationStylistSearch = async (date, time) => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/reservation/stylistSearch/" + date + "/" + time,
        headers: {
          "Content-Type": "application/json",
        },
      });

      let reservationStylistDetail = response.data.data;
      return reservationStylistDetail;
    } catch (err) {
      throw Error(err);
    }
  };

  static completeReservation = async () => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/reservation/find/Complete",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let completeReservationDetail = response.data.data;
      return completeReservationDetail;
    } catch (err) {
      throw Error(err);
    }
  };

  static eachStylistReservationPerWeek = async () => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/reservation/stylist",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let eachStylistDetail = response.data.data;
      return eachStylistDetail;
    } catch (err) {
      NotificationManager.error(err.response.data.message, "error");
      throw Error(err);
    }
  };

  static dragReservationUpdate = async (
    reservationID,
    date,
    time,
    enteredStylist,
    enteredClient,
    enteredServiceType,
    enteredReservationStatus
  ) => {
    try {
      let response = await axios({
        method: "put",
        baseURL:
          API_ORIGIN +
          "/reservation/dragReservation/" +
          reservationID +
          "/" +
          date +
          "/" +
          time +
          "/" +
          enteredStylist,
        data: {
          client_email: enteredClient,
          service_type: enteredServiceType,
          reservation_status: enteredReservationStatus,
          reservation_count: 1,
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
}
