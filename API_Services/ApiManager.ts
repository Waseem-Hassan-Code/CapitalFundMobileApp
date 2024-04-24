import { Platform } from "react-native";
import axios from "axios";

let baseURL = "http://10.1.105.230:5181";

if (Platform.OS === "ios") {
  baseURL = "http://10.1.105.230:5181";
}

const ApiManager = axios.create({
  baseURL,
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;

// HOME : http://192.168.10.13:5180
