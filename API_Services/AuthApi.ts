import ApiManager from "./ApiManager";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import { getId, getRole, setId, setName, setRole } from "./Token";

export const loginApi = async (data: any) => {
  try {
    const result = await ApiManager.post("/api/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.data && result.data.results) {
      const decodedToken: any = jwtDecode(result.data.results);
      // console.log("Decoded token:", decodedToken);
      // console.log("Cleims", decodedToken.Name, decodedToken.Id);
      await setId(decodedToken.Id);
      await setName(decodedToken.Name);
      await setRole(decodedToken.Role);
    }
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.error("Login error:", error);
      return { error: "An unexpected error occurred." };
    }
  }
};
