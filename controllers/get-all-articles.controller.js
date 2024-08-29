const { selectArticles } = require("../models/select-articles.model");

exports.getAllArticles = (request, response, next) => {;
  selectArticles()
    .then((articlesData) => {
      //console.log(articlesData)
      response.status(200).send(articlesData);
    })
    .catch((error) => {
      next(error);
    });
};
