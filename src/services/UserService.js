import axios from "axios";
import { API_ORIGIN } from "../config/constants";

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

      let userDetail = response.data.data;

      return userDetail;
    } catch (err) {
      throw err;
    }
  };

  static inviteUser = async (email) => {
    try {
      let response = await axios({
        method: "get",
        baseURL: API_ORIGIN + "/invite-user/" + email,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      // let inviteUserDetail = response.data.data;

      // return inviteUserDetail;

      // console.log(response);
      if (response.data.success !== false) {
        let inviteUserDetail = response.data.data;

        return inviteUserDetail;
      } else {
        throw Error("Email Send Failed");
      }
    } catch (err) {
      throw err;
    }
  };
}
