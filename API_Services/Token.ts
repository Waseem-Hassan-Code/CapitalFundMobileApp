import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const setToken = async (token) => {
  try {
    const tokenString = JSON.stringify(token);
    await AsyncStorage.setItem("token", tokenString);
    return true;
  } catch (error) {
    return false;
  }
};

export const setId = async (id) => {
  try {
    const tokenString = JSON.stringify(id);
    await AsyncStorage.setItem("uid", tokenString);
  } catch (error) {
    console.error("Error setting uid:", error);
  }
};
export const setName = async (name) => {
  try {
    const tokenString = JSON.stringify(name);
    await AsyncStorage.setItem("name", tokenString);
  } catch (error) {
    console.error("Error setting name:", error);
  }
};
export const setRole = async (role) => {
  try {
    const tokenString = JSON.stringify(role);
    await AsyncStorage.setItem("role", tokenString);
  } catch (error) {
    console.error("Error setting role:", error);
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

export const getId = async () => {
  try {
    const IdString = await AsyncStorage.getItem("uid");
    const Id = JSON.parse(IdString);
    return Id;
  } catch (error) {
    console.log("Error retrieving uid:", error);
    return null;
  }
};

export const getName = async () => {
  try {
    const nameString = await AsyncStorage.getItem("name");
    const name = JSON.parse(nameString);
    return name;
  } catch (error) {
    console.log("Error retrieving name:", error);
    return null;
  }
};

export const getRole = async () => {
  try {
    const roleString = await AsyncStorage.getItem("role");
    const role = JSON.parse(roleString);
    return role;
  } catch (error) {
    console.log("Error retrieving role:", error);
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
