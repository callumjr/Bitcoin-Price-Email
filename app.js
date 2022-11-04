const axios = require("axios");
const nodemailer = require("nodemailer");
const express = require("express");
const config = require("./config");
const sendgridKey = config.MY_API_KEY;
const senderEmail = config.SENDER_EMAIL;

//get the price data from the coingecko api

async function getPriceData(n) {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/",
      {}
    );

    const data = response.data[n];

    return data;
  } catch (error) {
    throw error;
  }
}

//use price data to send email using nodemailer

const emailFunction = (price, recieverEmail, coin) => {
  getPriceData(coin).then((response) => {
    const coinPrice = response.market_data.current_price.usd;
    const coinName = response.name;
    const coinSymbol = response.symbol.toUpperCase();
    console.log(coinPrice);
    const selectedPrice = price;

    if (coinPrice < selectedPrice) {
      const transport = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
          user: "apikey",
          pass: sendgridKey,
        },
      });

      const message = {
        from: senderEmail,
        to: recieverEmail,
        subject: `${coinSymbol} PRICE BELOW ${selectedPrice}!`,
        text: `${coinName} price is below your selected price of ${selectedPrice}, and is currently ${coinPrice}. This presents a good buying opportunity.`,
      };

      transport.sendMail(message, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });
    }

    setTimeout(emailFunction, 60000);
  });
};

module.exports = {
  getPriceData,
  emailFunction,
};
