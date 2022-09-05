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
}
