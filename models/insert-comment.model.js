const db = require("../db/connection");

exports.insertComment = (article_id, newComment) => {
  const { username, body } = newComment;

  return db
    .query(
      "INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *",
      [username, body, article_id]
    )
    .then((commentData) => {
      const comment = commentData.rows[0];
      return comment;
    });
};
