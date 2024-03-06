import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

const getToken = () => `Bearer ${localStorage.getItem("token")}`;

export const getProducts = async (queryParameter) => {
  try {
    const response = await axios.get(
      `${baseUrl}/products?shopId=${queryParameter.shopId}`,
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      //   const { status } = error.response;
      //   switch (status) {
      //     case 400:
      //       console.error("Bad request:", error.response.data.message);
      //       break;
      //     case 401:
      //       console.error("Unauthorized:", error.response.data.message);
      //       break;
      //     case 404:
      //       console.error("Not found:", error.response.data.message);
      //       break;
      //     default:
      //       console.error("Server error:", error.response.data.message);
      //       break;
      //   }
      return error.response.data;
    } else {
      console.error(`Error while fetching products: ${error.message}`);
      throw error;
    }
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(
      `${baseUrl}/products/manage/add`,
      product,
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error(`Error while adding the new product: ${error.message}`);
      throw error;
    }
  }
};

export const deleteProduct = async (productsToDelete) => {
  try {
    const response = await axios.delete(`${baseUrl}/products/manage/delete`, {
      data: { productsToDelete },
      headers: {
        Authorization: getToken(),
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error(`Error while deleting the products: ${error.message}`);
      throw error;
    }
  }
};
