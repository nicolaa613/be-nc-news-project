const db = require("../db/connection");

exports.updateArticle = (article_id, articleUpdate) => {
  if (Object.keys(articleUpdate).length === 0) {
    return Promise.reject({
      message: "No data provided. Cannot execute request!",
      status: 400,
    });
  }
  if (isNaN(article_id)) {
    return Promise.reject({
      message: "This is a bad request, invalid article id!",
      status: 400,
    });
  }
  if (isNaN(articleUpdate.inc_votes)) {
    return Promise.reject({
      message: "This is a bad request, invalid input!",
      status: 404,
    });
  }
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
      [articleUpdate.inc_votes, article_id]
    )
    .then((articleData) => {
      if (articleData.rows.length === 0) {
        return Promise.reject({
          message: "Cannot alter vote, article doesn't exist!",
          status: 404,
        });
      }
      const updatedArticle = articleData.rows[0];
      return updatedArticle;
    });
};
