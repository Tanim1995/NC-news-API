const db = require("../db/connection");
const format = require("pg-format");

exports.fetchArticleById = ()=>{
    const query = "SELECT * FROM articles WHERE id = 1$"

    return db.query(query)

}