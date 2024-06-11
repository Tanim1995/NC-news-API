const { fetchTopics, invalidPaths } = require("../models/topic-model");
const endpoints = require("../endpoints.json")

exports.getTopics = (req, res, next) => {
  fetchTopics().then((results) => {
    res.status(200).send({ topics: results });
  }).catch((err)=>{
    next(err)
  })
};

exports.invalidRoutes = (req, res, next) => {
  invalidPaths().catch((err) => {
    next(err);
  });
};

