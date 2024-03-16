import ApiManager from "./ApiManager";
import { getToken } from "./Token";

export const getMonthlyFair = async (id: string) => {
  try {
    const token = await getToken();
    const result = await ApiManager.get(`/api/getMonthlyFair?userId=${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

//api/paymentsHistory?userId=1&page=1&pageSize=10
export const getPaymentHistory = async (
  id: string,
  pageNumber: number,
  pageSize: number
) => {
  try {
    const token = await getToken();
    const result = await ApiManager.get(
      `/api/paymentsHistory?userId=${id}&page=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
//http://localhost:5180/api/getComplaints?userId=a&page=2&pageSize=23

export const getComplaintsHistory = async (
  id: string,
  pageNumber: number,
  pageSize: number
) => {
  try {
    const token = await getToken();
    const result = await ApiManager.get(
      `/api/getComplaints?userId=${id}&page=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
