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


exports.fetchArticles = (sort_by = "created_at", order = "DESC", next) => {
  console.log(sort_by);

  const queryValues = [];
  let query =
    "SELECT articles.article_id,articles.title,articles.author,articles.topic,articles.created_at,articles.votes,articles.article_img_url,COUNT(comments.comment_id) AS comment_count FROM articles  LEFT JOIN comments  ON articles.article_id = comments.article_id GROUP BY articles.article_id";

  const validSortBy = [
    "author",
    "title",
    "article__id",
    "topic",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count",
  ];
  if(!(order.toLowerCase() === "desc" || order.toLowerCase() === "asc")){
    return Promise.reject({ status: 400, message: "Bad Request" })
  }

  if (!validSortBy.includes(sort_by) && sort_by) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }

  if (sort_by) {
    query += ` ORDER BY ${sort_by} ${order.toUpperCase()}`;
  }
  query += ";";

  return db
    .query(query)
    .then((results) => {
      return results.rows;
    })
    .catch((err) => {
      next(err);
    });
};
