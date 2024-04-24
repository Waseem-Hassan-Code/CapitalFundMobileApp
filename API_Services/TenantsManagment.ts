import ApiManager from "./ApiManager";
import { getToken } from "./Token";

//=================Add New Tenants==================

export const addNewTenant = async (data: any) => {
  try {
    const token = await getToken();
    const result = await ApiManager.post(`/api/addNewTenant`, data, {
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

//=================Update New Tenants==================

export const updateTenantInfo = async (data: any) => {
  try {
    const token = await getToken();
    const result = await ApiManager.post(`/api/updateTenantInfo`, data, {
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

//=================Delete New Tenants==================

export const deleteTenantInfo = async (Id: string) => {
  try {
    const token = await getToken();
    console.log("Called deletion");
    const result = await ApiManager.get(`/api/deleteTenantInfo?Id=${Id}`, {
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

//=================Add New Tenants==================

export const getTenantsInfo = async (page: number, pageSize: number) => {
  try {
    const token = await getToken();
    console.log(token);
    console.log(page, pageSize);
    const result = await ApiManager.get(
      `/api/getAllTenants?page=${page}&pageSize=${pageSize}`,
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
