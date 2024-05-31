const {
  fetchArticleById,
  fetchArticles,
  editVotes,
} = require("../models/article-model");

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.article_id;

  fetchArticleById(articleId, next)
    .then((chosenArticle) => {
      res.status(200).send({ article: chosenArticle });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  fetchArticles(req.query.sort_by, req.query.order)
    .then((articleList) => {
      res.status(200).send({ articles: articleList });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchVotes = (req, res, next) => {
  const articleId = req.params.article_id;
  const updateVote = req.body;
  console.log(articleId);

  editVotes(articleId, updateVote)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};
