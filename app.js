const axios = require("axios");
const nodemailer = require("nodemailer");

async function getData() {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/bitcoin",
    {}
  );
  const data = response.data;
  const price = data.market_data.current_price.usd;
  return data;
}

getData().then((response) =>
  console.log(response.market_data.current_price.usd)
);

//first get the program to work when run
//then automate the program to run constantly
