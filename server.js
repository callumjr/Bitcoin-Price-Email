const express = require("express");
const mongoose = require("mongoose");
const config = require("./backend/config");
const {
  createRecipient,
} = require("./backend/controllers/recipient-controller");
const checkRecipientPrice = require("./backend/app");

const app = express();

app.use(express.static(__dirname + "/static"));

//connect to db
mongoose
  .connect(config.MONG_URI)
  .then(() => {
    app.post("/", express.json(), createRecipient);

    app.listen(3000, () => {
      console.log("Server is up on port 3000.");
    });
  })
  .catch((err) => {
    console.log(err);
  });
//

//we need to check data
//search through database
//check each one if price of coin is lower
//if so email
