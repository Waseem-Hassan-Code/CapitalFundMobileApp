import ApiManager from "./ApiManager";
import { getToken } from "./Token";

//=================Get Tenants Complaints==================

export const getAllComplaints = async (page: number, pageSize: number) => {
  try {
    const token = await getToken();
    const result = await ApiManager.get(
      `/api/getAllComplains?page=${page}&pageSize=${pageSize}`,
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

//=================Update Tenants Complaints==================

export const updateTenantComplaint = async (data: any) => {
  try {
    const token = await getToken();
    const result = await ApiManager.post(`/api/updateComplain`, data, {
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

//=================Delete Tenants Complaints==================

export const deleteTenantComplaint = async (complainId: string) => {
  try {
    const token = await getToken();
    const result = await ApiManager.get(
      `/api/removeComplain?complainId=${complainId}`,
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
