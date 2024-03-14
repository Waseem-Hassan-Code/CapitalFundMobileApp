import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("token", token);
    console.log("Token set successfully");
  } catch (error) {
    console.error("Error setting token:", error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.log("Error retrieving token:", error);
    return null;
  }
};

export const decodeToken = async () => {
  try {
    const token = await getToken();
    if (token) {
      if (typeof token === "string") {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        return decodedToken;
      } else {
        console.error("Token is not a string:", token);
        return null;
      }
    } else {
      console.log("Token not found");
      return null;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
    console.log("Token deleted successfully.");
  } catch (error) {
    console.log("Error deleting token:", error);
  }
};

export const readToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      console.log("Token:", token);
      return token;
    } else {
      console.log("Token not found.");
      return null;
    }
  } catch (error) {
    console.log("Error reading token:", error);
    return null;
  }
};
