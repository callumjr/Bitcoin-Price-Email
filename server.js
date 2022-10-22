const express = require("express");

const app = express();

app.use(express.static(__dirname + "/static"));

app.post("/", express.json(), (req, res) => {
  console.log(req.body);
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
