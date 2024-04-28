import { Platform } from "react-native";
import axios from "axios";

let baseURL = "http://192.168.67.42:5181";

if (Platform.OS === "ios") {
  baseURL = "http://192.168.67.42:5181";
}

const ApiManager = axios.create({
  baseURL,
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;

// HOME : http://192.168.10.12:5180
