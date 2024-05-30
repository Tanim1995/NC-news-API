const express = require("express");
const { getTopics, invalidRoutes } = require("../controllers/topic-controller");
const { customErrorHandler } = require("../errors");
const { getEndPoints } = require("../controllers/endpoint-controller")
const { getArticleById, patchVotes } = require("../controllers/article-controller")
const {  getArticles } = require("../controllers/article-controller")
const { getComments,addComments } = require("../controllers/comments-controller")


const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api", getEndPoints)
app.get("/api/articles", getArticles)
app.get("/api/articles/:article_id",getArticleById)
app.get("/api/articles/:article_id/comments", getComments)

app.post("/api/articles/:article_id/comments",addComments)
app.patch("/api/articles/:article_id", patchVotes)



app.get("*", invalidRoutes);
app.use(customErrorHandler);
module.exports = app;


/*
object which describes all the avaialble endpoints, each  end point is an object with more o*/