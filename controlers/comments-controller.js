const { fetchComments } = require("../models/comments-model");
const { addText, removeComments } = require("../models/comments-model");

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

exports.addComments = (req, res, next) => {
  const articleId = req.params.article_id;
  const { userName, body } = req.body;

  addText(articleId, userName, body)
    .then((comment) => {
      res.status(201).send({ message: comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComments = (req, res, next) => {
  const commentId = req.params.comment_id;

  removeComments(commentId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};
