import ApiManager from "./ApiManager";
import { getToken } from "./Token";

//=================Get Property==================
export const getAllProperties = async (page: number, pageSize: number) => {
  try {
    const token = await getToken();
    const result = await ApiManager.get(
      `/api/getAllProperties?page=${page}&pageSize=${pageSize}`,
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

//=================Create Property==================
export const createPropertyDetails = async (data: any) => {
  try {
    const token = await getToken();
    const result = await ApiManager.post(`/api/addNewProperty`, data, {
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

//=================Update Property==================
export const updatePropertyDetails = async (data: any) => {
  try {
    const token = await getToken();
    const result = await ApiManager.post(`/api/updateProperty`, data, {
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

//=================Delete Property==================
export const deletePropertyDetails = async (propertyId: string) => {
  try {
    const token = await getToken();
    const result = await ApiManager.get(
      `/api/deleteProperty?propertyId=${propertyId}`,
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
