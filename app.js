const express = require("express");
const app = express();
const { getTopics } = require("./controllers/get-topics.controller");
const { getEndpoints } = require("./controllers/get-endpoints.controller");
const { getArticle } = require("./controllers/get-article.controller");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle);

app.all("/*", (request, response) => {
  response
    .status(404)
    .send({ message: "This is a bad request, endpoint not found!" });
});

app.use((error, request, response, next) => {
  const { status, message } = error;
  if (error.message === "This is a bad request, endpoint not found!") {
    response.status(status).send({ message });
  } else {
    next(error);
  }
});

app.use((error, request, response, next) => {
  const { status, message } = error;
  if (error.message === "Article doesn't exist!") {
    response.status(status).send({ message });
  } else {
    next(error);
  }
});

module.exports = app;
