const db = require("../db/connection");
const format = require("pg-format");

exports.fetchComments = (articleId) => {
  const queryValues = [];
  let query =
    "SELECT comments.comment_id,comments.votes,comments.created_at,comments.author,comments.body,comments.article_id FROM comments LEFT JOIN articles ON comments.article_id = articles.article_id ";

  if (articleId) {
    queryValues.push(articleId);
    query += "WHERE articles.article_id = $1 ORDER BY created_at DESC";
  }

  return db.query(query, queryValues).then((comments) => {
    const commentsArray = comments.rows;

    if (commentsArray.length === 0) {
      return Promise.reject({ status: 404, message: "Not Found" });
    }

    return commentsArray;
  });
};

exports.addText = (articleId, userName, body) => {
  const queryValues = [body, userName, articleId];
  const checkUserExist = "SELECT * FROM users WHERE username = $1;";
  const addTextQuery =
    "INSERT INTO comments (body,author,article_id) VALUES ($1,$2,$3) RETURNING *;";
  

  return db.query(checkUserExist, [userName]).then((users) => {
    

    if (users.rows.length === 0) {
      return Promise.reject({ status: 404, message: "Not Found" });
    }
    return db.query(addTextQuery, queryValues).then((comments) => {

      return comments.rows[0].body;
    });
  });
};
