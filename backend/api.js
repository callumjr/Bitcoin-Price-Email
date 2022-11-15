const axios = require("axios");

//get a specific coin
async function getPriceData(symbol = "btc") {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/",
      {}
    );

    const data = response.data;
    let obj = data.find((o) => o.symbol === symbol.toLowerCase());

    return obj;
  } catch (error) {
    throw error;
  }
}

// get list of coins
async function getCryptoList() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/",
      {}
    );

    const data = response.data;

    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getPriceData,
  getCryptoList,
};
