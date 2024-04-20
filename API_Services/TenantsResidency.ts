import ApiManager from "./ApiManager";
import { getToken } from "./Token";

//=================Create Tenants Residency==================

export const createTenantResidency = async (data: any) => {
  try {
    const token = await getToken();
    const result = await ApiManager.post(`/api/addNewContract`, data, {
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

//=================Update Tenants Residency==================

export const updateTenantResidency = async (data: any) => {
  try {
    const token = await getToken();
    const result = await ApiManager.post(`/api/updateContract`, data, {
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

//=================Delete Tenants Residency==================

export const deleteTenantResidency = async (recordId: any) => {
  try {
    const token = await getToken();
    const result = await ApiManager.get(
      `/api/deleteContract?recordId=${recordId}`,
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

//=================Get Tenants Residency==================

export const getenantResidency = async (page: number, pageSize: number) => {
  try {
    const token = await getToken();
    const result = await ApiManager.get(
      `/api/getAllContract?page=${page}&pageSize=${pageSize}`,
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
