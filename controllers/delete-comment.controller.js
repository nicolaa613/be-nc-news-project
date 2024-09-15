const { removeCommentById } = require("../models/remove-comment-by-id.model");

exports.deleteComment = (request, response, next) => {
  const { comment_id } = request.params;

  removeCommentById(comment_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
};
