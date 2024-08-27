const express = require("express");
const app = express();
const { getTopics } = require("./controllers/get-topics.controller");
const { getEndpoints } = require("./controllers/get-endpoints.controller");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.all("/*", (request, response) => {
  response
    .status(404)
    .send({ message: "This is a bad request, endpoint not found!" });
});

module.exports = app;
