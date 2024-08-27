const express = require("express");
const app = express();
const { getTopics } = require("./controllers/get-topics.controller");

app.use(express.json());

app.get("/api/topics", getTopics);

app.use((request, response) => {
  response
    .status(404)
    .send({ message: "This is a bad request, endpoint not found!" });
});

module.exports = app;
