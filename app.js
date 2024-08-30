const express = require("express");
const app = express();
const { getTopics } = require("./controllers/get-topics.controller");
const { getEndpoints } = require("./controllers/get-endpoints.controller");
const { getArticle } = require("./controllers/get-article.controller");
const { getAllArticles } = require("./controllers/get-all-articles.controller");
const { getComments } = require("./controllers/get-comments.controller");
const { postComment } = require("./controllers/post-comment.controller");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postComment);

//Error-Handling Middleware

app.all("/*", (request, response) => {
  response
    .status(404)
    .send({ message: "This is a bad request, endpoint not found!" });
});

app.use((error, request, response, next) => {
  if (error.code === "23503") {
    response.status(404).send({ message: "Username does not exist!" });
  } else if (error.code === "23502") {
    response.status(400).send({ message: "No comment to post!" });
  } else {
    next(error);
  }
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
