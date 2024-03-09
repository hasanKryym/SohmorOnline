import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const getToken = () => `Bearer ${localStorage.getItem("token")}`;

export const getShops = async () => {
  try {
    const response = await axios.get(`${baseUrl}/shops`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

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
          Authorization: getToken(),
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const add_domain = async (domain) => {
  try {
    const response = await axios.post(
      `${baseUrl}/shops/manage/addDomain`,
      { name: domain },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const get_Domains = async () => {
  try {
    const response = await axios.get(`${baseUrl}/shops/domains`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
