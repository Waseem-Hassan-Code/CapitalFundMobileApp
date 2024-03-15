import { Platform } from "react-native";
import axios from "axios";

let baseURL = "http://192.168.227.49:5181";

if (Platform.OS === "ios") {
  baseURL = "http://192.168.227.49:5181";
}

const ApiManager = axios.create({
  baseURL,
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;
