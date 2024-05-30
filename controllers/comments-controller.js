const { fetchComments } = require("../models/comments-model");

exports.getComments = (req, res, next) => {
  const articleId = req.params.article_id;

  fetchComments(articleId)
    .then((comment) => {
      res.status(200).send({ comments: comment });
    })
    .catch((err) => {
      next(err);
    });
};
