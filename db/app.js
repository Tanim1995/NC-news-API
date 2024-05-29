const express = require("express");
const { getTopics, invalidRoutes } = require("../controllers/topic-controller");
const { customErrorHandler } = require("../errors");
const { getEndPoints } = require("../controllers/endpoint-controller")
const { getArticleById } = require("../controllers/article-controller")
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api", getEndPoints)
app.get("/api/articles/:articles_id",getArticleById)

app.get("*", invalidRoutes);
app.use(customErrorHandler);
module.exports = app;


/*
object which describes all the avaialble endpoints, each  end point is an object with more o*/