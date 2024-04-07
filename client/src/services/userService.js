import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const getToken = () => `Bearer ${localStorage.getItem("token")}`;

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
      console.error(`Error while registering in: ${error.message}`);
      throw error;
    }
  }
};

export const updateUserCart = async (cart) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/users/cart`,
      { cart },
      {
        headers: { Authorization: getToken() },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error(`Error while updating cart in: ${error.message}`);
      throw error;
    }
  }
};

export const editUser = async (userData) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/users/manage/edit`,
      { userData },
      {
        headers: { Authorization: getToken() },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error(`Error while editing user: ${error.message}`);
      throw error;
    }
  }
};

export const editUserFav = async (newFavorites) => {
  if (!newFavorites) return;
  try {
    const response = await axios.patch(
      `${baseUrl}/users/fav`,
      { newFavorites },
      {
        headers: { Authorization: getToken() },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error(`Error while adding to fav: ${error.message}`);
      throw error;
    }
  }
};
