import AsyncStorage from "@react-native-async-storage/async-storage";
import * as jwt from "jwt-decode";

export const setToken = async (token) => {
  try {
    const tokenString = JSON.stringify(token);
    await AsyncStorage.setItem("token", tokenString);
    console.log("Token set successfully");
  } catch (error) {
    console.error("Error setting token:", error);
  }
};

export const getToken = async () => {
  try {
    const tokenString = await AsyncStorage.getItem("token");
    const token = JSON.parse(tokenString);
    return token;
  } catch (error) {
    console.log("Error retrieving token:", error);
    return null;
  }
};

export const decodedToken = async () => {
  try {
    const token = await getToken();
    console.log("Token:", token);

    if (token) {
      console.log("Get for decoding ", token);
      if (typeof token === "string") {
        const decodedToken = await jwt.jwtDecode(token);
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
