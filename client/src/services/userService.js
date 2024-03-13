import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const login = async (dataObj) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, dataObj);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error(`Error while logging in: ${error.message}`);
      throw error;
    }
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error(`Error while logging in: ${error.message}`);
      throw error;
    }
  }
};
