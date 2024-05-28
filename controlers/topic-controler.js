const { fetchTopics, invalidPaths } = require("../models/topic-model");

exports.getTopics = (req, res, next) => {
  fetchTopics().then((results) => {
    res.status(200).send({ topics: results });
  });
};

exports.invalidRoutes = (req, res, next) => {
  invalidPaths().catch((err) => {
    next(err);
  });
};
