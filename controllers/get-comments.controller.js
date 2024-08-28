const { fetchComments } = require("../models/fetch-comments.model");

exports.getComments = (request, response, next) => {
  const { article_id } = request.params;

  fetchComments(article_id)
    .then((requestedComments) => {
      response.status(200).send(requestedComments);
    })
    .catch((error) => {
      next(error);
    });
};
