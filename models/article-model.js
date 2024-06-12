const db = require("../db/connection");


exports.fetchArticleById = (articleId) => {




  const query = " SELECT articles.article_id, articles.title,articles.author,articles.topic,articles.body,articles.created_at,articles.votes,articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;";
  const values = [articleId];

  return db.query(query, values).then((article1Row) => {
    const article = article1Row.rows;

    if (article.length === 0) {
      return Promise.reject({ status: 404, message: "Not Found" });
    }
console.log(article1Row.rows);
    return article1Row.rows[0];


  });
};

exports.fetchArticles = (
  sort_by = "created_at",
  order = "DESC",
  topic,
  next
) => {
  const queryValues = [];




  if (!isNaN(parseInt(topic))) {
    return Promise.reject({ status: 404, message: "Not Found" });
  }
  if (topic) {

    return db
      .query(`SELECT * FROM articles WHERE topic LIKE '%${topic}%';`)
      .then((results) => {

        console.log(results)
        if (results.rows.length === 0) {
          return Promise.reject({ status: 404, message: "Not Found" });
        }

        return results.rows;
      });
  }

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

  if (!(order.toLowerCase() === "desc" || order.toLowerCase() === "asc")) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }

  if (!validSortBy.includes(sort_by) && sort_by) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }

  if (sort_by) {
    query += ` ORDER BY ${sort_by} ${order.toUpperCase()}`;
  }
  query += ";";

  return db.query(query).then((results) => {
    return results.rows;
  });
};

exports.editVotes = (articleId, updateVote) => {
  const queryValues = [updateVote.inc_votes, articleId];

  const query =
    "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;";

  const checkifIdExists = "SELECT * FROM articles WHERE article_id = $1;";

  if (Object.keys(updateVote).length === 0) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }
  if (isNaN(updateVote.inc_votes)) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }

  return db.query(checkifIdExists, [articleId]).then((user) => {
    if (user.rows.length === 0) {
      return Promise.reject({ status: 404, message: "Not Found" });
    }
    return db.query(query, queryValues).then((editedArticle) => {
      return editedArticle.rows;
    });
  });
};
