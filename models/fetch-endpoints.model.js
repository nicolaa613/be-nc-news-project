const fs = require("fs/promises");
//const endpointsData = require("../endpoints.json")

exports.fetchEndpoints = () => {
  return fs
    .readFile(`${__dirname}/../endpoints.json`, "UTF-8")
    .then((endpointsData) => {
      return endpointsData;
    });
};
