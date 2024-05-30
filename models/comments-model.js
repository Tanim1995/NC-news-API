const db = require("../db/connection");
const format = require("pg-format");

exports.fetchComments = (articleId) => {
  const queryValues = [];
  let query =
    "SELECT * FROM comments LEFT JOIN articles ON comments.article_id = articles.article_id ";

  if (articleId) {
    queryValues.push(articleId);
    query += "WHERE articles.article_id = $1";
  }

  return db.query(query, queryValues).then((comments) => {
    const commentsArray = comments.rows;

    if (commentsArray.length === 0) {
      return Promise.reject({ status: 404, message: "Not Found" });
    }

    return commentsArray;
  });
};
