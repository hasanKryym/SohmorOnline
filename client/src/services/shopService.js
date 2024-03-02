import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const shopAdminToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWRiNTc4ZjliMzIyYWFkZWMyNTgzMTAiLCJuYW1lIjoiQWxpIiwicm9sZSI6eyJwb3NpdGlvbiI6InNob3BBZG1pbiIsInNob3AiOiI2NWRiNTc2ZTliMzIyYWFkZWMyNTgzMGMifSwiaWF0IjoxNzA4ODczNjE1LCJleHAiOjE3NDA0MDk2MTV9.tcUY7rcH2CE4lAIKlBVm_WITlnAafpaxh3zjFQDacZQ";

export const getShopCategories = async (shopId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/shops/categories?shopId=${shopId}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createShopCategory = async (category) => {
  try {
    const response = await axios.post(
      `${baseUrl}/shops/manage/addCategory`,
      { category },
      {
        headers: {
          Authorization: shopAdminToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
