const axios = require("axios");
const nodemailer = require("nodemailer");
const express = require("express");
const config = require("./config");
const sendgridKey = config.MY_API_KEY;
const senderEmail = config.SENDER_EMAIL;
const recieverEmail = config.RECIEVER_EMAIL;

//get the price data from the coingecko api

async function getPriceData() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin",
      {}
    );

    const data = response.data;
    const price = data.market_data.current_price.usd;

    return price;
  } catch (error) {
    throw error;
  }
}

//use price data to send email using nodemailer

const emailFunction = () =>
  getPriceData().then((response) => {
    const btcPrice = response;
    const selectedPrice = 20200;

    if (btcPrice < selectedPrice) {
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
        subject: `BTC PRICE BELOW ${selectedPrice}!`,
        text: `Bitcoin price is below your selected price of ${selectedPrice}, and is currently ${btcPrice}. This presents a good buying opportunity.`,
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

emailFunction();

//check if email already sent you dont want to clutter inbox
//send a weekly report of the price
