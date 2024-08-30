const { updateArticle } = require("../models/update-article.model");

exports.patchArticle = (request, response, next) => {
  const { article_id } = request.params;
  const articleUpdate = request.body;
  updateArticle(article_id, articleUpdate)
    .then((updatedArticle) => {
      response.status(200).send(updatedArticle);
    })
    .catch((error) => {
      next(error);
    });
};
