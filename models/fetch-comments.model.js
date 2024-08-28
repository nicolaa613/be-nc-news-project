const db = require("../db/connection");

exports.fetchComments = (article_id) => {
  if (isNaN(article_id)) {
    return Promise.reject({
      message: "This is a bad request, endpoint not found!",
      status: 400,
    });
  }
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [article_id]
    )
    .then((comments) => {
      const requestedComments = comments.rows;
      if (requestedComments.length === 0) {
        return Promise.reject({
          message: "No comments available!",
          status: 404,
        });
      }
      return requestedComments;
    });
};
