const express = require("express");
const app = express();
const { getTopics } = require("./controllers/get-topics.controller");
const { getEndpoints } = require("./controllers/get-endpoints.controller");
const { getArticle } = require("./controllers/get-article.controller");
const { getAllArticles } = require("./controllers/get-all-articles.controller");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle);

app.get("/api/articles", getAllArticles);

app.all("/*", (request, response) => {
  response
    .status(404)
    .send({ message: "This is a bad request, endpoint not found!" });
});

app.use((error, request, response, next) => {
  const { status, message } = error;
  if (error.message) {
    response.status(status).send({ message });
  } else {
    next(error);
  }
});

module.exports = app;
