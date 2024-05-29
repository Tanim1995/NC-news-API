const { fetchArticleById } = require("../models/article-model");

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.article_id;

  fetchArticleById(articleId, next)
    .then((chosenArticle) => {
      res.status(200).send({ article: chosenArticle });
    })
    .catch((err) => {
      next(err);
      console.log(err);
    });
};
