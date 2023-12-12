const axios = require('axios');

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    const playerData = response.data;
    return playerData.epl_table
  } catch (error) {
     return error
  }
};

module.exports = {fetchData};