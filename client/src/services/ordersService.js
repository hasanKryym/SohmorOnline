import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const getToken = () => `Bearer ${localStorage.getItem("token")}`;

export const addOrder = async (cart) => {
  if (!cart) return;
  try {
    const response = await axios.post(
      `${baseUrl}/orders`,
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
      console.error(`Error while creating order: ${error.message}`);
      throw error;
    }
  }
};

export const getOrders = async (ordersParams) => {
  let url = `${baseUrl}/orders`;
  if (ordersParams.status) url += `?status=${ordersParams.status}`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: getToken() },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error(`Error while retrieving order: ${error.message}`);
      throw error;
    }
  }
};

export const updateOrder = async (orderId, updatedOrder) => {
  if (!orderId || !updatedOrder) return;
  try {
    const response = await axios.patch(
      `${baseUrl}/orders?orderId=${orderId}`,
      { updatedOrder },
      {
        headers: { Authorization: getToken() },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error(`Error while creating order: ${error.message}`);
      throw error;
    }
  }
};
