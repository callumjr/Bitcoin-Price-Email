const axios = require("axios");
const nodemailer = require("nodemailer");
const express = require("express");

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

getPriceData().then((response) => {
  const price = response;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "17676eb50fc4d1",
      pass: "42ccafa18b3112",
    },
  });

  const message = {
    from: "callum.rosier2018@gmail.com",
    to: "callum.rosier2018@gmail.com",
    subject: "Bitcoin Price!",
    text: `Bitcoin price is currently ${price}, this presents a good buying opportunity.`,
  };

  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
});

//first get the program to work when run
//then automate the program to run constantly
