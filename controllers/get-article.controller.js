const { fetchArticle } = require("../models/fetch-article.model");

exports.getArticle = (request, response, next) => {
  const { article_id } = request.params;

  fetchArticle(article_id)
    .then((requestedArticle) => {
      response.status(200).send(requestedArticle);
    })
    .catch((error) => {
      next(error);
    });
};
