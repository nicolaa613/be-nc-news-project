const db = require("../db/connection");

exports.removeCommentById = (comment_id) => {
    if (isNaN(comment_id)) { 
        return Promise.reject({
          message: "This is a bad request, invalid input!",
          status: 400,
        });
      }

  return db
    .query("DELETE FROM comments WHERE comment_id = $1 RETURNING *", [
      comment_id,
    ])
    .then((commentData) => {
      if (commentData.rows.length === 0) {
        return Promise.reject({
          status: 404,
          message: "Comment doesn't exist, cannot be deleted!",
        });
      }
    });
};

