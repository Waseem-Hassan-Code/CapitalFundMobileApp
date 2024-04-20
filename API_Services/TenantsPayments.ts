import ApiManager from "./ApiManager";
import { getToken } from "./Token";

//=================Get Tenants Payments==================

export const getAllPayments = async (page: number, pageSize: number) => {
  try {
    const token = await getToken();
    const result = await ApiManager.get(
      `/api/getAllPayments?page=${page}&pageSize=${pageSize}`,
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

//=================Delete Tenants Payments==================

export const deletePayments = async (recordId: string) => {
  try {
    const token = await getToken();
    const result = await ApiManager.get(
      `/api/deletePayment?recordId=${recordId}`,
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

//=================Update Tenants Payments==================

export const updatePayments = async (data: any) => {
  try {
    const token = await getToken();
    const result = await ApiManager.post(`/api/updatePayments`, data, {
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

//=================Crete Tenants Payments==================

export const createPayments = async (data: any) => {
  try {
    const token = await getToken();
    const result = await ApiManager.post(`/api/addNewPayment`, data, {
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
