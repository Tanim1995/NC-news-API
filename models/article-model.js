const db = require("../db/connection");
const format = require("pg-format");

exports.fetchArticleById = (articleId, next) => {
  const query = "SELECT * FROM articles WHERE article_id = $1";
  const values = [articleId];

  return db
    .query(query, values)
    .then((article1Row) => {
      const article = article1Row.rows;

      if (article.length === 0) {
        return Promise.reject({ status: 404, message: "Not Found" });
      }

      return article1Row.rows[0];
    })
    .catch((err) => {
      next(err);
    });
};
