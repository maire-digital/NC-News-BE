const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");

const app = express();
//app.use(express.json())

app.get("/api/topics", getTopics);
//app.use

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

module.exports = app;
