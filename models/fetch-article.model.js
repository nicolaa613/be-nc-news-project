const db = require("../db/connection");

exports.fetchArticle = (article_id) => {
  if (isNaN(article_id)) {
    return Promise.reject({
      message: "This is a bad request, endpoint not found!",
      status: 400,
    });
  }
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((articleData) => {
      if (articleData.rows.length === 0) {
        return Promise.reject({
          message: "Article doesn't exist!",
          status: 404,
        });
      }
      const requestedArticle = articleData.rows[0];
      return requestedArticle;
    });
};
