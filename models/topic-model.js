const db = require("../db/connection");
const format = require("pg-format");

exports.fetchTopics = () => {
  const query = "SELECT * FROM topics;";

  return db.query(query).then((topicsArray) => {
    return topicsArray.rows;
  }).catch((err)=>{
  next(err)
  })
  
};
exports.invalidPaths = () => {
  return Promise.reject({ status: 404, msg: "Not Found" });
};
