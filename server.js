const emailCode = require("./app");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const Recipient = require("./models/recipient");

const app = express();

app.use(express.static(__dirname + "/static"));

//connect to db
mongoose
  .connect(config.MONG_URI)
  .then(() => {
    app.post("/", express.json(), async (req, res) => {
      const { email, price, coin, coinId } = req.body;
      try {
        const recipient = await Recipient.create({
          email,
          price,
          coin,
          coinId,
        });
        res.status(200).json(recipient);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }

      // emailCode.emailFunction(selectedPrice, userEmail, coin);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
