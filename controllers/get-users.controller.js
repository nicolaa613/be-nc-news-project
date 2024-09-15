const { selectUsers } = require("../models/select-users.model");

exports.getUsers = (request, response, next) => {
  selectUsers()
    .then((usersData) => {
      response.status(200).send(usersData);
    })
    .catch((error) => {
      next(error);
    });
};
