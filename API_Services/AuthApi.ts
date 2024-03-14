import ApiManager from "./ApiManager";

export const loginApi = async (data: any) => {
  try {
    const result = await ApiManager.post("/api/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
