const { insertComment } = require("../models/insert-comment.model");

exports.postComment = (request, response, next) => {
  const { article_id } = request.params;
  const newComment = request.body;

  insertComment(article_id, newComment)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((error) => {
      next(error);
    });
};
