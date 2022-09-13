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
      throw err;
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

      // console.log(response);
      let reservationDetailSearch = response.data.data;

      return reservationDetailSearch;
    } catch (err) {
      throw err;
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

      console.log(response.data.data);

      let reservationStylistDetail = response.data.data;

      return reservationStylistDetail;
    } catch (err) {
      throw err;
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

      // console.log(response);
      let completeReservationDetail = response.data.data;

      return completeReservationDetail;
    } catch (err) {
      throw err;
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
      throw err;
    }
  };
}
