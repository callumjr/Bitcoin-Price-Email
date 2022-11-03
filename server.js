const emailCode = require("./app");
const express = require("express");

const app = express();

app.use(express.static(__dirname + "/static"));

app.post("/", express.json(), (req, res) => {
  const userEmail = req.body.userEmail;
  const selectedPrice = req.body.selectedPrice;
  const coin = req.body.coin;

  emailCode.emailFunction(selectedPrice, userEmail, coin);
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
