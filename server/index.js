const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json("hello world");
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
