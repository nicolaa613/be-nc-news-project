const { selectTopics } = require("../models/select-topics.model");

exports.getTopics = (request, response, next) => {
  selectTopics()
    .then((topicsData) => {
      response.status(200).send(topicsData);
    })
    .catch((error) => {
      next(error);
    });
};
