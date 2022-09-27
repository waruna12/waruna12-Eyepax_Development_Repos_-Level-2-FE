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

      if (response.data.success !== false) {
        let responseData = response.data.data;

        return responseData;
      } else {
        throw Error("reservation validation failed");
      }
    } catch (err) {
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
      let responseData = response.data.data;

      return responseData;
    } catch (err) {
      throw Error(err);
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

      if (response.data.success !== false) {
        let responseData = response.data.data;

        return responseData;
      } else {
        throw Error("reservation validation failed");
      }
    } catch (err) {
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
        baseURL: API_ORIGIN + "/reservation/stylistsearch/" + date + "/" + time,
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

  static completeReservation = async (key) => {
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

  static eachStylistReservation = async () => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/reservations/stylist",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let eachStylistDetail = response.data.data;

      return eachStylistDetail;
    } catch (err) {
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
          "/drag_reservation/" +
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

      if (response.data.success !== false) {
        let responseData = response.data.data;

        return responseData;
      } else {
        throw Error("");
      }
    } catch (err) {
      throw Error(err);
    }
  };
}
