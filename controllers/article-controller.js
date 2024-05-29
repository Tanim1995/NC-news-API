const { fetchArticleById, fetchArticles } = require("../models/article-model");

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
