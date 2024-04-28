import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const getToken = () => `Bearer ${localStorage.getItem("token")}`;

export const getShops = async (queryParameter, all) => {
  let url = `${baseUrl}/shops`;
  let usedParams = false;

  if (queryParameter.shopId) {
    url += `?shopId=${queryParameter.shopId}`;
    usedParams = true;
  }

  if (queryParameter.search) {
    url += `${usedParams ? "&" : "?"}search=${queryParameter.search}`;
    usedParams = true;
  }

  if (queryParameter.domain) {
    url += `${usedParams ? "&" : "?"}domain=${queryParameter.domain}`;
    usedParams = true;
  }
  if (all) {
    url += `${usedParams ? "&" : "?"}all=${all}`;
    usedParams = true;
  }
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const add_shop = async (shopData) => {
  try {
    const response = await axios.post(`${baseUrl}/shops/manage/add`, shopData, {
      headers: {
        Authorization: getToken(),
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const edit_shop = async (shopData) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/shops/manage/edit`,
      shopData,
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

export const delete_shop = async (shopId) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/shops/manage/delete/${shopId}`,
      {
        headers: { Authorization: getToken() },
      }
    );
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

export const editShopCategory = async (categoryData) => {
  if (!categoryData?.name || !categoryData?._id) return;

  const name = categoryData.name;
  try {
    const response = await axios.patch(
      `${baseUrl}/shops/manage/editCategory?_id=${categoryData._id}`,
      { name },
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

export const shopActivation = async (shopId, isActive) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/shops/activation`,
      { shopId, isActive },
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

export const addShopRegistrationRequest = async (requestData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/shops/requests`,
      { requestData },
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

export const changeRequestStatus = async (requestId, newStatus) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/shops/requests`,
      { requestId, newStatus },
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

export const getRegistrationRequests = async (status) => {
  let url = `${baseUrl}/shops/requests`;
  if (status) url += `?status=${status}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: getToken(),
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
