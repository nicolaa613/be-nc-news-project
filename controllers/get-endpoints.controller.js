const { fetchEndpoints } = require("../models/fetch-endpoints.model");

exports.getEndpoints = (request, response, next) => {
  fetchEndpoints()
    .then((endpointsData) => {
      response.status(200).send(endpointsData);
    })
    .catch((error) => {
      next(error);
    });
};
