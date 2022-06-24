const axios = require("axios").default;

exports.get = async (url, config) => {
  try {
    const { data } = await axios.get(url, config);
    return { success: true, data };
  } catch (error) {
    return { success: false, message: "Access token has expired or is not yet valid." };
  }
};