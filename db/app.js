const express = require("express");
const { getTopics, invalidRoutes } = require("../controlers/topic-controler");
const { customErrorHandler } = require("../errors");
const { getEndPoints } = require("../controlers/endpoint-controller")
const { getArticleById, patchVotes } = require("../controlers/article-controller")
const {  getArticles } = require("../controlers/article-controller")
const { getComments,addComments, deleteComments } = require("../controlers/comments-controller")
const { getUsers } = require("../controlers/user-controller")
const cors = require("cors")

app.use(cors());
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api", getEndPoints)
app.get("/api/articles", getArticles)
app.get("/api/articles/:article_id",getArticleById)
app.get("/api/articles/:article_id/comments", getComments)
app.get("/api/users", getUsers)

app.post("/api/articles/:article_id/comments",addComments)
app.patch("/api/articles/:article_id", patchVotes)

app.delete("/api/comments/:comment_id", deleteComments)




app.get("*", invalidRoutes);
app.use(customErrorHandler);
module.exports = app;


/*
object which describes all the avaialble endpoints, each  end point is an object with more o*/