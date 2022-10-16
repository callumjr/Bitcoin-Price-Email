const express = require("express");

const app = express();

app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
