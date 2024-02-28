import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const shopAdminToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWRiNTc4ZjliMzIyYWFkZWMyNTgzMTAiLCJuYW1lIjoiQWxpIiwicm9sZSI6eyJwb3NpdGlvbiI6InNob3BBZG1pbiIsInNob3AiOiI2NWRiNTc2ZTliMzIyYWFkZWMyNTgzMGMifSwiaWF0IjoxNzA4ODczNjE1LCJleHAiOjE3NDA0MDk2MTV9.tcUY7rcH2CE4lAIKlBVm_WITlnAafpaxh3zjFQDacZQ";

export const getProducts = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/products?shopId=65db576e9b322aadec25830c`,
      {
        headers: {
          Authorization: shopAdminToken,
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
