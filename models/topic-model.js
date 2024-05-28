const db = require("../db/connection");
const format = require("pg-format");

exports.fetchTopics = () => {
  let query = "SELECT * FROM topics;";

  return db.query(query).then((results) => {
    return results.rows;
  });
};
exports.invalidPaths = () => {
  return Promise.reject({ status: 404, msg: "Not Found" });
};
