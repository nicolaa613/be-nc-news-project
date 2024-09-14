const { selectArticles } = require("../models/select-articles.model");
//controller is to handle a successful response or pass on the error 
exports.getAllArticles = (request, response, next) => {;
  selectArticles()
    .then((articlesData) => {
      response.status(200).send(articlesData);
    })
    .catch((error) => {
      next(error);
    });
};
