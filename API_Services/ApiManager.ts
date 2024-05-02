import { Platform } from "react-native";
import axios from "axios";

<<<<<<< HEAD
let baseURL = "http://192.168.227.49:5181";

if (Platform.OS === "ios") {
  baseURL = "http://192.168.227.49:5181";
=======
let baseURL = "http://192.168.67.42:5181";

if (Platform.OS === "ios") {
  baseURL = "http://192.168.67.42:5181";
>>>>>>> 48a77c6bcb815f8cb34bd96070b1ab20599449ac
}

const ApiManager = axios.create({
  baseURL,
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;

// HOME : http://192.168.10.12:5180
