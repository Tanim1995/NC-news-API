
const fetchArticleById = require("../models/article-model")

exports.getArticleById = ()=>{
    console.log(req.params)
    fetchArticleById().then((result)=>{

    }).catch((err)=>{
        next(err)
    })
}