import ApiManager from "./ApiManager";
import { getToken } from "./Token";

//=================Get Images==================

export const getTenantsInfo = async (complaintId: string) => {
  try {
    const token = await getToken();
    const result = await ApiManager.get(
      `/api/getComplaintImage?complaintId=${complaintId}`,
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

//=================Get Property Names DDL==================

export const getPropertiesNameDDL = async (complaintId: string) => {
  try {
    const token = await getToken();
    const result = await ApiManager.get(`/api/dropDownPropertyName`, {
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

//=================Get User Names DDL==================

export const getUserNameDDL = async (complaintId: string) => {
  try {
    const token = await getToken();
    const result = await ApiManager.get(`/api/dropDownUserName`, {
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

//=================Get Tenants Names DDL==================

export const getTenantsNameDDL = async (complaintId: string) => {
  try {
    const token = await getToken();
    const result = await ApiManager.get(`/api/dropDownTenantName`, {
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
