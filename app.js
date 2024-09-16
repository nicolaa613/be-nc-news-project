const express = require("express");
const app = express();
const cors = require("cors")
const { getTopics } = require("./controllers/get-topics.controller");
const { getEndpoints } = require("./controllers/get-endpoints.controller");
const { getArticle } = require("./controllers/get-article.controller");
const { getAllArticles } = require("./controllers/get-all-articles.controller");
const { getComments } = require("./controllers/get-comments.controller");
const { postComment } = require("./controllers/post-comment.controller");
const { patchArticle } = require("./controllers/patch-article.controller");
const { deleteComment } = require("./controllers/delete-comment.controller");
const { getUsers } = require("./controllers/get-users.controller");
const {
  customErrorHandling,
  psqlErrorHandling,
  generalErrorHandling,
} = require("./errors/errors");

app.use(cors())

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users", getUsers);

//Error-Handling Middleware

app.all("/*", (request, response) => {
  response.status(404).send({ message: "Endpoint not found!" });
});

app.use(customErrorHandling);
app.use(psqlErrorHandling);
app.use(generalErrorHandling);

module.exports = app;
