const { selectEndpointsJson } = require("../models/endpoints.models");

exports.getEndpointsJson = (req, res, next) => {
  selectEndpointsJson()
    .then((endpoints) => {
      res.status(200).send({ endpoints });
    })
    .catch((err) => {
      next(err);
    });
};
