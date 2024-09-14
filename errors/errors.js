exports.customErrorHandling = (error, request, response, next) => {
    if (error.code === "23503" && error.detail.includes("article_id")) {
        response.status(404).send({ message: "Cannot post comment, article doesn't exist!" });
      } else if (error.code === "22P02" && error.where.includes("unnamed portal parameter $3")) {
        response
          .status(400)
          .send({ message: "This is a bad request, invalid article id!" });
      } else if (error.code === "22P02" && error.where.includes("unnamed portal parameter $1")) {
        response
          .status(404)
          .send({ message: "Cannot alter vote, article doesn't exist!" });
      }  else {
        next(error);
      }
}

exports.psqlErrorHandling = (error, request, response, next) => {
  if (error.code === "23503") {
    response.status(404).send({ message: "Username does not exist!" });
  } else if (error.code === "23502") {
    response.status(400).send({ message: "No comment to post!" });
  } else if (error.code === "22P02") {
    response
      .status(400)
      .send({ message: "This is a bad request, invalid input!" });
  } else {
    next(error);
  }
};

exports.generalErrorHandling = (error, request, response, next) => {
    const { status, message } = error;
    if (error.message) {
      response.status(status).send({ message });
    } else {
      next(error);
    }
}

