import axios from "./index";
import { API_ENDPOINT } from "../constants";
class AuthApi {

  static Login = (data) => {
    return axios.post(`/api/login`, data);
  };

  // don't forget to add the register and logout methods
}

export default AuthApi;