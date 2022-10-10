const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
