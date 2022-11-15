const nodemailer = require("nodemailer");
const config = require("./config");
const { getPriceData } = require("./api");
const sendgridKey = config.MY_API_KEY;
const senderEmail = config.SENDER_EMAIL;

//use price data to send email using nodemailer

const emailFunction = (
  selectedPrice,
  recieverEmail,
  coinSymbol,
  coinName,
  current_price
) => {
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
    text: `${coinName} price is below your selected price of ${selectedPrice}, and is currently ${current_price}. This presents a good buying opportunity.`,
  };

  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = emailFunction;
